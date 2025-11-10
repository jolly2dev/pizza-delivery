import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { Pizza, PizzaSchema } from '../pizza/schemas/pizza.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Pizza.name, schema: PizzaSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
