import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Pizza } from '../../pizza/schemas/pizza.schema';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  DELIVERED = 'delivered',
}

@Schema()
export class Order {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Pizza' }],
    required: true,
  })
  pizzas: Pizza[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
