import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
