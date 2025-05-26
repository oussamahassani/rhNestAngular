import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(@Body('to') to: string) {
    return this.mailerService.sendTestEmail(to);
  }
}
