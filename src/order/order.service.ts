import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (pizzas.length !== createOrderDto.pizzas.length) {
      throw new NotFoundException('One or more pizzas not found');
    }
    const totalPrice = pizzas.reduce(
      (acc: number, pizza: Pizza) => acc + pizza.price,
      0,
    );
    const createdOrder = new this.orderModel({
      ...createOrderDto,
      totalPrice,
    });
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('pizzas').exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('pizzas').exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return existingOrder;
  }

  async remove(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return deletedOrder;
  }
}
