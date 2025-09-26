import { Controller, Get, Post, Patch, Body, Param, UseGuards, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SuperUserGuard } from '../common/guards/super-user.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  @UseGuards(SuperUserGuard)
  async getAllPayments() {
    return this.paymentsService.getAllPayments();
  }

  @Get('pending')
  @UseGuards(SuperUserGuard)
  async getPendingPayments() {
    return this.paymentsService.getPendingPayments();
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    return this.paymentsService.getPayment(id);
  }

  @Get('order/:orderId')
  async getPaymentsByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.getPaymentsByOrder(orderId);
  }

  @Patch(':id/confirm')
  @UseGuards(SuperUserGuard)
  async confirmPayment(
    @Param('id') id: string,
    @Body() confirmPaymentDto: ConfirmPaymentDto
  ) {
    return this.paymentsService.confirmPayment(id, confirmPaymentDto);
  }

  @Patch(':id/cancel')
  @UseGuards(SuperUserGuard)
  async cancelPayment(@Param('id') id: string) {
    return this.paymentsService.cancelPayment(id);
  }
}
