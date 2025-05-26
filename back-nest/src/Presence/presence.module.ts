import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Presence, PresenceSchema } from 'src/schemas/presence.schema';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';



@Module({
  imports: [MongooseModule.forFeature([{ name: Presence.name, schema: PresenceSchema }])],
  controllers: [PresenceController],
  providers: [PresenceService],
  exports: [MongooseModule,PresenceService],
 
})
export class PresenceModule {}

