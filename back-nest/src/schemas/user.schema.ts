import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/schemas/role.schema';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  // Poste (optionnel, requis uniquement si rôle = employee)
  @Prop()
  poste?: string;

  // Date d'embauche (optionnelle, idem)
  @Prop()
  date?: string;

  // Abonnement fields
  @Prop({
    type: {
      planType: { 
        type: String, 
        enum: ['free', 'basic', 'premium', 'enterprise'], 
        default: 'free' 
      },
      startDate: { type: Date },
      endDate: { type: Date },
      isActive: { type: Boolean, default: false },
      paymentMethod: { type: String },
      autoRenew: { type: Boolean, default: false },
      lastPaymentDate: { type: Date },
      nextBillingDate: { type: Date }
    },
    default: {}
  })
  abonnement?: {
    planType: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
    paymentMethod?: string;
    autoRenew?: boolean;
    lastPaymentDate?: Date;
    nextBillingDate?: Date;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

// Optional: Add virtual property for subscription status
/* UserSchema.virtual('isPremium').get(function() {
  return this.abonnement?.isActive && this.abonnement?.planType !== 'free';
}); */