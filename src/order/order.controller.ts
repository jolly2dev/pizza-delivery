import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';

// This controller handles all incoming requests for the /orders endpoint.
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // This endpoint creates a new order.
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  // This endpoint gets all the orders.
  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // This endpoint gets a single order by its ID.
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    const order = await this.orderService.findOne(id);
    // If the order is not found, throw a 404 error.
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // This endpoint updates an order.
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderService.update(id, updateOrderDto);
    // If the order is not found, throw a 404 error.
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // This endpoint deletes an order.
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    const order = await this.orderService.remove(id);
    // If the order is not found, throw a 404 error.
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
