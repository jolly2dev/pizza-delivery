import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { Pizza, PizzaDocument } from '../pizza/schemas/pizza.schema';

// This service handles all the logic for orders.
@Injectable()
export class OrderService {
  constructor(
    // Inject the Order model.
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    // Inject the Pizza model to get pizza prices.
    @InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>,
  ) {}

  // Create a new order.
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Find the pizzas that are in the order.
    const pizzas = await this.pizzaModel
      .find({
        _id: { $in: createOrderDto.pizzas },
      })
      .exec();

    // Calculate the total price of the order.
    // A simple way is to just add up the prices of the pizzas.
    let totalPrice = 0;
    for (let i = 0; i < pizzas.length; i++) {
      totalPrice += pizzas[i].price;
    }

    // Create a new order object with the customer's data and the total price.
    const createdOrder = new this.orderModel({
      customerName: createOrderDto.customerName,
      address: createOrderDto.address,
      phone: createOrderDto.phone,
      pizzas: createOrderDto.pizzas,
      totalPrice: totalPrice,
    });

    // Save the order to the database.
    return createdOrder.save();
  }

  // Find all orders.
  async findAll(): Promise<Order[]> {
    // This just returns all orders, but doesn't include the pizza details.
    return this.orderModel.find().exec();
  }

  // Find a single order by ID.
  async findOne(id: string): Promise<Order> {
    // Find the order by its ID.
    const order = await this.orderModel.findById(id).exec();
    // If not found, return null.
    if (!order) {
      return null;
    }
    return order;
  }

  // Update an order's status.
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    // Find the order by its ID.
    const existingOrder = await this.orderModel.findById(id).exec();

    // If the order doesn't exist, return null.
    if (!existingOrder) {
      return null;
    }

    // If a new status is provided, update it.
    if (updateOrderDto.status) {
      existingOrder.status = updateOrderDto.status;
    }

    // Save the updated order.
    return existingOrder.save();
  }

  // Delete an order.
  async remove(id: string): Promise<Order> {
    // Find the order by ID and delete it.
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    // If it wasn't found, return null.
    if (!deletedOrder) {
      return null;
    }
    return deletedOrder;
  }
}
