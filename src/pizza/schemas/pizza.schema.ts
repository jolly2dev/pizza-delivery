import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PizzaDocument = Pizza & Document;

export enum PizzaSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

@Schema()
export class Pizza {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: PizzaSize })
  size: PizzaSize;

  @Prop({ required: true })
  price: number;ǚ
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
