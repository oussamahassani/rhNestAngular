import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto, PaymentResponseDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  async initiatePayment(
    @Body() paymentDto: PaymentDto,
  ): Promise<PaymentResponseDto> {
    try {
      console.log('Received paymentDto:', JSON.stringify(paymentDto, null, 2));
      return await this.paymentService.initiatePayment(paymentDto);
    } catch (err) {
      throw new HttpException(
        err.response?.data || 'Payment initiation failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':paymentId')
  async getPaymentDetails(@Param('paymentId') paymentId: string): Promise<any> {
    try {
      return await this.paymentService.getPaymentDetails(paymentId);
    } catch (error) {
      console.log('Error:', error);
      const err = error ;
      throw new HttpException(
        err.response?.data || 'Failed to retrieve payment details',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}