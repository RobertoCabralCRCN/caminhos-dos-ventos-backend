import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentMethod } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { Pedido, PedidoStatus } from '../entities/pedido.entity';
import { MessagingService } from '../messaging/messaging.service';
import * as QRCode from 'qrcode';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Pedido)
    private orderRepository: Repository<Pedido>,
    private messagingService: MessagingService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, amount, method, notes } = createPaymentDto;

    // Verificar se o pedido existe
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['cliente']
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    // Verificar se já existe um pagamento para este pedido
    const existingPayment = await this.paymentRepository.findOne({
      where: { orderId, status: PaymentStatus.PENDING }
    });

    if (existingPayment) {
      throw new BadRequestException('Já existe um pagamento pendente para este pedido');
    }

    // Criar o pagamento
    const payment = this.paymentRepository.create({
      orderId,
      amount,
      method,
      notes,
      status: PaymentStatus.PENDING,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
    });

    // Se for PIX, gerar QR Code
    if (method === PaymentMethod.PIX) {
      await this.generatePixData(payment);
    }

    const savedPayment = await this.paymentRepository.save(payment);

    this.logger.log(`Pagamento criado: ${savedPayment.id} para pedido ${orderId}`);

    return savedPayment;
  }

  private async generatePixData(payment: Payment): Promise<void> {
    // Chave PIX do Nubank (você deve configurar no .env)
    const pixKey = process.env.NUBANK_PIX_KEY || 'roberto.cabral.cn@gmail.com';
    
    // Gerar ID de transação único
    const transactionId = crypto.randomBytes(16).toString('hex');
    payment.transactionId = transactionId;
    payment.pixKey = pixKey;

    // Criar payload PIX (formato simplificado)
    const pixPayload = this.createPixPayload(payment);
    payment.pixCopyPaste = pixPayload;

    // Gerar QR Code
    try {
      const qrCodeDataURL = await QRCode.toDataURL(pixPayload, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      payment.pixQrCode = qrCodeDataURL;
    } catch (error) {
      this.logger.error('Erro ao gerar QR Code:', error);
      throw new BadRequestException('Erro ao gerar QR Code PIX');
    }
  }

  private createPixPayload(payment: Payment): string {
    // Payload PIX simplificado (formato EMV)
    const payload = {
      pixKey: payment.pixKey,
      amount: payment.amount,
      description: `Pedido #${payment.orderId}`,
      merchantName: 'Caminho dos Ventos',
      merchantCity: 'São Paulo',
      transactionId: payment.transactionId
    };

    // Em um cenário real, você usaria uma biblioteca específica para PIX
    // Aqui estamos criando um payload simplificado
    return JSON.stringify(payload);
  }

  async confirmPayment(paymentId: string, confirmPaymentDto: ConfirmPaymentDto): Promise<Payment> {
    const { transactionId, notes } = confirmPaymentDto;

    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['order', 'order.cliente']
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException('Pagamento já foi processado');
    }

    if (payment.expiresAt && payment.expiresAt < new Date()) {
      payment.status = PaymentStatus.EXPIRED;
      await this.paymentRepository.save(payment);
      throw new BadRequestException('Pagamento expirado');
    }

    // Confirmar pagamento
    payment.status = PaymentStatus.CONFIRMED;
    payment.confirmedAt = new Date();
    payment.transactionId = transactionId;
    if (notes) {
      payment.notes = notes;
    }

    const confirmedPayment = await this.paymentRepository.save(payment);

    // Atualizar status do pedido
    if (payment.order) {
      payment.order.status = PedidoStatus.AGUARDANDO_PRODUCAO;
      await this.orderRepository.save(payment.order);
    }

    // Enviar notificações
    if (payment.order?.cliente) {
      await this.messagingService.sendPaymentConfirmation(
        payment.order.cliente.telefone,
        payment.order.cliente.nome,
        payment.order.id,
        payment.method,
        payment.amount
      );
    }

    this.logger.log(`Pagamento confirmado: ${paymentId}`);

    return confirmedPayment;
  }

  async getPayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['order', 'order.cliente']
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return payment;
  }

  async getPaymentsByOrder(orderId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { orderId },
      relations: ['order'],
      order: { createdAt: 'DESC' }
    });
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: ['order', 'order.cliente'],
      order: { createdAt: 'DESC' }
    });
  }

  async cancelPayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId }
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException('Apenas pagamentos pendentes podem ser cancelados');
    }

    payment.status = PaymentStatus.CANCELLED;
    return this.paymentRepository.save(payment);
  }

  async getPendingPayments(): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { status: PaymentStatus.PENDING },
      relations: ['order', 'order.cliente'],
      order: { createdAt: 'DESC' }
    });
  }
}
