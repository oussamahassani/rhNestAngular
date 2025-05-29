import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type OrganisationDocument = Organisation & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class Organisation {
  @Prop({ required: true })
  nameorg: string;
  email:string;
  taille:string;
planType:string;
startDate: string;

}
export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
