import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Organisation, OrganisationSchema } from '../schemas/organisation.shema';

import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { MailerModule } from '../mailer/mailer.module'; // <-- importe le bon chemin


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),
    UserModule,MailerModule
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [OrganisationService], 
})
export class UserModule {}