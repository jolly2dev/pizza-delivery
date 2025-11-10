import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    return pizza;
  }

  async update(id: string, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    const existingPizza = await this.pizzaModel
      .findByIdAndUpdate(id, updatePizzaDto, { new: true })
      .exec();
    if (!existingPizza) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    return existingPizza;
  }

  async remove(id: string): Promise<Pizza> {
    const deletedPizza = await this.pizzaModel.findByIdAndDelete(id).exec();
    if (!deletedPizza) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    return deletedPizza;
  }
}
