import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { StagaireModule } from './stagaire/stagaire.module';
import { DemandeModule } from './Demande/demande.module';
import { PresenceModule } from './Presence/presence.module';
import {SupabaseModule} from './supabase/supabase.module'
import {MailerModule} from './mailer/mailer.module';
import { FileLoggerService } from './FileLogger'; // adapte le chemin
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/gestionressource'),
    UserModule,
    AuthModule,
    RoleModule,
    StagaireModule,
    DemandeModule,
    PresenceModule,
    SupabaseModule,
MailerModule

  ],
    controllers: [PaymentController,WebhookController],  // ✅ CORRECT: this is where controllers go

    providers: [FileLoggerService , PaymentService],

})
export class AppModule {}
