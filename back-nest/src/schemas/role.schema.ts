import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class Role {
  @Prop({ required: true , unique: true })
  name: string;



}
export const RoleSchema = SchemaFactory.createForClass(Role);


