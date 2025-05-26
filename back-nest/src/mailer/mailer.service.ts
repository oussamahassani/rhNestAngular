import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '8667d30e9ea8b2',     // Mailtrap username
        pass: '514c010602723f',     // Mailtrap password
      },
    });
  }
 async sendForgetPasswordEmail(to: string , password:string){
    const info = await this.transporter.sendMail({
    from: '"Support App" <support@example.com>',
    to,
    subject: 'Votre nouveau mot de passe',
    text: `Bonjour,\n\nVoici votre nouveau mot de passe : ${password}\n\nVeuillez le changer après connexion.`,
    html: `
      <p>Bonjour,</p>
      <p>Voici votre <b>nouveau mot de passe</b> :</p>
      <p><code>${password}</code></p>
      <p>Veuillez le changer après connexion.</p>
    `,
  });

  console.log('Email envoyé : %s', info.messageId);
  return info;
 }
  async sendTestEmail(to: string) {
    const info = await this.transporter.sendMail({
      from: '"Test App" <no-reply@example.com>',
      to,
      subject: 'Hello from NestJS + Mailtrap',
      text: 'This is a test email from NestJS using Mailtrap.',
      html: '<b>This is a test email from NestJS using Mailtrap.</b>',
    });

    console.log('Email sent: %s', info.messageId);
    return info;
  }
}
