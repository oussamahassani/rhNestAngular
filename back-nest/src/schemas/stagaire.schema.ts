import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type StagaireDocument = Stagaire & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class Stagaire {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  tel: string;

  @Prop({ required: true })
  adresse: string;

  @Prop({ required: true })
  date: string;
  
  @Prop({ required: true })
  supervise: string;

   @Prop({ required: true })
   objectif: string;
}
export const StagaireSchema = SchemaFactory.createForClass(Stagaire);


