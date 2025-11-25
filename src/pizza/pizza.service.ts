import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza, PizzaDocument } from './schemas/pizza.schema';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>,
  ) {}

  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    const createdPizza = new this.pizzaModel(createPizzaDto);
    return createdPizza.save();
  }

  async findAll(): Promise<Pizza[]> {
    return this.pizzaModel.find().exec();
  }

  async findOne(id: string): Promise<Pizza> {
    const pizza = await this.pizzaModel.findById(id).exec();
    if (!pizza) {
      return null;
    }
    return pizza;
  }

  async update(id: string, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    const existingPizza = await this.pizzaModel.findById(id).exec();

    if (!existingPizza) {
      return null;
    }

    if (updatePizzaDto.name) {
      existingPizza.name = updatePizzaDto.name;
    }
    if (updatePizzaDto.size) {
      existingPizza.size = updatePizzaDto.size;
    }
    if (updatePizzaDto.price) {
      existingPizza.price = updatePizzaDto.price;
    }

    return existingPizza.save();
  }

  async remove(id: string): Promise<Boolean> {
    const deletedPizza = await this.pizzaModel.findByIdAndDelete(id).exec();
    if (!deletedPizza) {
      return false;
    }
    return true;
  }
}
