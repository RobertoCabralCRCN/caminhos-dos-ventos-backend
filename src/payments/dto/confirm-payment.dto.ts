import { IsString, IsOptional } from 'class-validator';

export class ConfirmPaymentDto {
  @IsString()
  transactionId!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
