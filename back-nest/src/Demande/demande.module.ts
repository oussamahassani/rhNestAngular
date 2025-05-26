import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemandeController } from './demande.controller';
import { Demande, DemandeSchema } from 'src/schemas/demande.schema';
import { DemandeService } from './demande.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: Demande.name, schema: DemandeSchema }])],
  controllers: [DemandeController],
  providers: [DemandeService],
  exports: [MongooseModule,DemandeService],
 
})
export class DemandeModule {}

