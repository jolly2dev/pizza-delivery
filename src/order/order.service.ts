import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { Pizza, PizzaDocument } from '../pizza/schemas/pizza.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const pizzas = await this.pizzaModel
      .find({
        _id: { $in: createOrderDto.pizzas },
      })
      .exec();

    let totalPrice = 0;
    for (let i = 0; i < pizzas.length; i++) {
      totalPrice += pizzas[i].price;
    }

    const createdOrder = new this.orderModel({
      customerName: createOrderDto.customerName,
      address: createOrderDto.address,
      phone: createOrderDto.phone,
      pizzas: createOrderDto.pizzas,
      totalPrice: totalPrice,
    });

    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      return null;
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderModel.findById(id).exec();

    if (!existingOrder) {
      return null;
    }

    if (updateOrderDto.status) {
      existingOrder.status = updateOrderDto.status;
    }

    return existingOrder.save();
  }

  async remove(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      return null;
    }
    return deletedOrder;
  }
}
