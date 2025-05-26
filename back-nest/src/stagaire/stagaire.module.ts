import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StagaireController } from './stagaire.controller';
import { StagaireService } from './stagaire.service';
import { Stagaire, StagaireSchema } from 'src/schemas/stagaire.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: Stagaire.name, schema: StagaireSchema }])],
  controllers: [StagaireController],
  providers: [StagaireService],
  exports: [MongooseModule,StagaireService],
 
})
export class StagaireModule {}

