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
})
export class AppModule {}
