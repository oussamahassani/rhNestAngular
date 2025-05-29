import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('webhook')
export class WebhookController {
  @Get()
  handleWebhook(
    @Query('payment_ref') paymentRef: string,
    @Res() res: Response,
  ) {
    try {
      console.log('Webhook received with payment_ref:', paymentRef);

      // Process payment status update here
      // For example, you might want to verify the payment status using the payment_ref
      // const paymentStatus = await this.paymentService.verifyPayment(paymentRef);
      console.log(`Payment Reference: ${paymentRef}`);

      // Respond to Konnect that webhook was received successfully
      res.status(200).send('Webhook processed');
    } catch (error) {
      console.error('Webhook processing error:', error);
      res.status(500).send('Webhook processing failed');
    }
  }
}