import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import axios from "axios";

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("SMTP_HOST", "smtp.gmail.com"),
      port: this.configService.get<number>("SMTP_PORT", 587),
      secure: false,
      auth: {
        user: this.configService.get<string>("SMTP_USER"),
        pass: this.configService.get<string>("SMTP_PASS"),
      },
    });
  }

  async sendOrderConfirmationToClient(
    clientPhone: string,
    clientName: string,
    orderNumber: string,
    orderTotal: number
  ): Promise<void> {
    const message = `🍃 *Caminho dos Ventos* 🍃

Olá ${clientName}! 

Seu pedido foi recebido com sucesso! 

📋 *Número do pedido:* ${orderNumber}
💰 *Valor total:* R$ ${orderTotal.toFixed(2)}

Acompanhe o status do seu pedido em nosso sistema.

Obrigado por escolher o Caminho dos Ventos! 🙏`;

    await this.sendWhatsAppMessage(clientPhone, message);
    this.logger.log(`WhatsApp enviado para cliente ${clientName} - Pedido ${orderNumber}`);
  }

  async sendOrderNotificationToAdmin(
    adminEmail: string,
    adminPhone: string,
    orderNumber: string,
    clientName: string,
    orderTotal: number,
    orderItems: any[]
  ): Promise<void> {
    const emailSubject = `Novo Pedido Recebido - #${orderNumber}`;
    const emailBody = `
      <h2>🍃 Novo Pedido Recebido - Caminho dos Ventos</h2>
      
      <p><strong>Número do Pedido:</strong> ${orderNumber}</p>
      <p><strong>Cliente:</strong> ${clientName}</p>
      <p><strong>Valor Total:</strong> R$ ${orderTotal.toFixed(2)}</p>
      
      <h3>Itens do Pedido:</h3>
      <ul>
        ${orderItems.map(item => `<li>${item.produto} - Qtd: ${item.quantidade}</li>`).join('')}
      </ul>
      
      <p>Acesse o sistema administrativo para processar o pedido.</p>
    `;

    const whatsappMessage = `🍃 *NOVO PEDIDO RECEBIDO* 🍃

📋 *Pedido:* ${orderNumber}
👤 *Cliente:* ${clientName}
💰 *Valor:* R$ ${orderTotal.toFixed(2)}

Acesse o sistema para processar o pedido.`;

    // Enviar email
    await this.sendEmail(adminEmail, emailSubject, emailBody);
    
    // Enviar WhatsApp
    await this.sendWhatsAppMessage(adminPhone, whatsappMessage);
    
    this.logger.log(`Notificações enviadas para admin - Pedido ${orderNumber}`);
  }

  async sendOrderStatusUpdate(
    clientPhone: string,
    clientName: string,
    orderNumber: string,
    newStatus: string
  ): Promise<void> {
    const statusMessages: Record<string, string> = {
      'aguardando_pagamento': '⏳ Seu pedido está aguardando pagamento.',
      'aguardando_producao': '🔄 Seu pedido foi confirmado e está aguardando produção.',
      'em_producao': '⚡ Seu pedido está sendo produzido com carinho.',
      'pronto_entrega': '📦 Seu pedido está pronto para entrega!',
      'entregue': '✅ Seu pedido foi entregue! Obrigado pela preferência.',
      'cancelado': '❌ Seu pedido foi cancelado. Entre em contato para mais informações.'
    };

    const message = `🍃 *Caminho dos Ventos* 🍃

Olá ${clientName}!

📋 *Pedido:* ${orderNumber}
📊 *Status:* ${statusMessages[newStatus] || newStatus}

Acompanhe seu pedido em nosso sistema.

Obrigado por escolher o Caminho dos Ventos! 🙏`;

    await this.sendWhatsAppMessage(clientPhone, message);
    this.logger.log(`Atualização de status enviada para ${clientName} - Pedido ${orderNumber}`);
  }

  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>("SMTP_FROM", "noreply@caminhodosventos.com"),
        to,
        subject,
        html,
      });
      this.logger.log(`Email enviado para ${to}: ${subject}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar email para ${to}:`, error);
      throw error;
    }
  }

  private async sendWhatsAppMessage(phone: string, message: string): Promise<void> {
    try {
      // Aqui você pode integrar com WhatsApp Business API, Twilio, ou outro serviço
      // Por enquanto, vamos simular o envio
      const whatsappApiUrl = this.configService.get<string>("WHATSAPP_API_URL");
      const whatsappToken = this.configService.get<string>("WHATSAPP_TOKEN");
      
      if (whatsappApiUrl && whatsappToken) {
        await axios.post(whatsappApiUrl, {
          to: phone,
          message: message
        }, {
          headers: {
            'Authorization': `Bearer ${whatsappToken}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Simulação para desenvolvimento
        this.logger.log(`[SIMULAÇÃO] WhatsApp para ${phone}: ${message}`);
      }
    } catch (error) {
      this.logger.error(`Erro ao enviar WhatsApp para ${phone}:`, error);
      throw error;
    }
  }

  async sendPaymentConfirmation(
    clientPhone: string,
    clientName: string,
    orderNumber: string,
    paymentMethod: string,
    amount: number
  ): Promise<void> {
    const message = `🍃 *Caminho dos Ventos* 🍃

Olá ${clientName}!

✅ *Pagamento Confirmado!*

📋 *Pedido:* ${orderNumber}
💳 *Método:* ${paymentMethod}
💰 *Valor:* R$ ${amount.toFixed(2)}

Seu pedido será processado em breve!

Obrigado por escolher o Caminho dos Ventos! 🙏`;

    await this.sendWhatsAppMessage(clientPhone, message);
    this.logger.log(`Confirmação de pagamento enviada para ${clientName} - Pedido ${orderNumber}`);
  }
}
