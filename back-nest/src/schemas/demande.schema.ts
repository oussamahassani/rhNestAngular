import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type DemandeDocument = Demande & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class Demande {
  @Prop({ required: true })
  code: string;
//nom de demandeur
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  poste: string;
 

  @Prop({
    type: String,
    enum: ['en attente', 'accepté', 'refusé'],
    default: 'en attente',
  })
  status: string; // le type de 'status' est maintenant une chaîne de caractères
}
export const DemandeSchema = SchemaFactory.createForClass(Demande);


