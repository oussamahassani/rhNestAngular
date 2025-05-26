import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PresenceDocument = Presence & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      return ret;
    }
  }
})
export class Presence {

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  heureArrive: string;

  @Prop() // optionnel
  heureDepart?: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const PresenceSchema = SchemaFactory.createForClass(Presence);

