import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import axios from "axios";
import twilio from "twilio";

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
    clientEmail: string,
    clientName: string,
    orderNumber: string,
    orderTotal: number
  ): Promise<void> {
    // Mensagem WhatsApp
    const whatsappMessage = `🍃 *Caminho dos Ventos* 🍃

Olá ${clientName}! 

Seu pedido foi recebido com sucesso! 

📋 *Número do pedido:* ${orderNumber}
💰 *Valor total:* R$ ${orderTotal.toFixed(2)}

Acompanhe o status do seu pedido em nosso sistema.

Obrigado por escolher o Caminho dos Ventos! 🙏`;

    // Email para o cliente
    const emailSubject = `Confirmação de Pedido - #${orderNumber}`;
    const emailBody = `
      <h2>🍃 Caminho dos Ventos - Pedido Confirmado</h2>
      
      <p>Olá ${clientName}!</p>
      
      <p>Seu pedido foi recebido com sucesso!</p>
      
      <p><strong>Número do Pedido:</strong> ${orderNumber}</p>
      <p><strong>Valor Total:</strong> R$ ${orderTotal.toFixed(2)}</p>
      
      <p>Acompanhe o status do seu pedido em nosso sistema.</p>
      
      <p>Obrigado por escolher o Caminho dos Ventos! 🙏</p>
    `;

    // Enviar WhatsApp e Email para o cliente
    await this.sendWhatsAppMessage(clientPhone, whatsappMessage);
    await this.sendEmail(clientEmail, emailSubject, emailBody);
    
    this.logger.log(`Notificações enviadas para cliente ${clientName} - Pedido ${orderNumber}`);
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

  private formatPhoneForWhatsApp(phone: string): string {
    // Remove todos os caracteres não numéricos
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Se começar com 11 (DDD de SP), adiciona 55 (Brasil)
    if (cleanPhone.startsWith('11') && cleanPhone.length === 11) {
      cleanPhone = '55' + cleanPhone;
    }
    // Se já tem 55, mantém
    else if (cleanPhone.startsWith('55') && cleanPhone.length === 13) {
      // Já está correto
    }
    // Se tem 10 dígitos (sem DDD), adiciona 5511
    else if (cleanPhone.length === 10) {
      cleanPhone = '5511' + cleanPhone;
    }
    
    // Adiciona o + no início
    return '+' + cleanPhone;
  }

  private async sendWhatsAppMessage(phone: string, message: string): Promise<void> {
    try {
      const twilioAccountSid = this.configService.get<string>("TWILIO_ACCOUNT_SID");
      const twilioAuthToken = this.configService.get<string>("TWILIO_AUTH_TOKEN");
      const twilioWhatsAppNumber = this.configService.get<string>("TWILIO_WHATSAPP_NUMBER");
      
      // Verificar se as credenciais são válidas (não são placeholders)
      const hasValidCredentials = twilioAccountSid && 
                                 twilioAuthToken && 
                                 twilioWhatsAppNumber &&
                                 !twilioAccountSid.includes('1234567890abcdef') &&
                                 !twilioAuthToken.includes('seu-') &&
                                 twilioAccountSid.startsWith('AC'); // Só aceita AC (US é User SID, não Account SID)
      
      if (hasValidCredentials) {
        // Usar Twilio para WhatsApp
        const client = twilio(twilioAccountSid, twilioAuthToken);
        
        // Formatar número para WhatsApp
        const formattedPhone = this.formatPhoneForWhatsApp(phone);
        const whatsappPhone = `whatsapp:${formattedPhone}`;
        
        this.logger.log(`[DEBUG] Telefone original: ${phone}`);
        this.logger.log(`[DEBUG] Telefone formatado: ${formattedPhone}`);
        this.logger.log(`[DEBUG] WhatsApp formatado: ${whatsappPhone}`);
        
        await client.messages.create({
          from: twilioWhatsAppNumber,
          to: whatsappPhone,
          body: message
        });
        
        this.logger.log(`WhatsApp enviado via Twilio para ${formattedPhone}`);
      } else {
        // Fallback para simulação se Twilio não estiver configurado corretamente
        const formattedPhone = this.formatPhoneForWhatsApp(phone);
        this.logger.log(`[SIMULAÇÃO] WhatsApp para ${formattedPhone}: ${message}`);
        this.logger.log(`[INFO] Configure credenciais válidas do Twilio para envio real`);
        
        if (twilioAccountSid && twilioAccountSid.startsWith('US')) {
          this.logger.log(`[INFO] Account SID: User SID detectado (US) - Precisa do Account SID (AC)`);
          this.logger.log(`[INFO] No Twilio Console, procure por 'Account SID' (não 'User SID')`);
        } else {
          this.logger.log(`[INFO] Account SID: ${twilioAccountSid ? (twilioAccountSid.startsWith('AC') ? 'Válido' : 'Inválido - deve começar com AC') : 'Não configurado'}`);
        }
        
        this.logger.log(`[INFO] Auth Token: ${twilioAuthToken ? 'Configurado' : 'Não configurado'}`);
        this.logger.log(`[INFO] WhatsApp Number: ${twilioWhatsAppNumber ? 'Configurado' : 'Não configurado'}`);
      }
      
    } catch (error) {
      this.logger.error(`Erro ao enviar WhatsApp para ${phone}:`, error);
      // Não falhar o pedido se WhatsApp falhar
      this.logger.log(`[FALLBACK] WhatsApp falhou, mas pedido continua válido`);
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
