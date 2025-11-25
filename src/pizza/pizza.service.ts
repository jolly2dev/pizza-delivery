import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza, PizzaDocument } from './schemas/pizza.schema';

// This service is responsible for all the business logic related to pizzas.
// It connects to the database and performs CRUD operations.
@Injectable()
export class PizzaService {
  constructor(
    // We are injecting the Mongoose model for the Pizza schema.
    @InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>,
  ) {}

  // This method creates a new pizza in the database.
  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    const createdPizza = new this.pizzaModel(createPizzaDto);
    // We save the new pizza to the database and return it.
    return createdPizza.save();
  }

  // This method finds all the pizzas in the database.
  async findAll(): Promise<Pizza[]> {
    // We use the find() method on the model to get all pizzas.
    return this.pizzaModel.find().exec();
  }

  // This method finds a single pizza by its ID.
  async findOne(id: string): Promise<Pizza> {
    // We use the findById() method to find the pizza.
    const pizza = await this.pizzaModel.findById(id).exec();
    // If the pizza is not found, we return null.
    if (!pizza) {
      return null;
    }
    return pizza;
  }

  // This method updates a pizza's information.
  async update(id: string, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    // First, find the pizza by its ID.
    const existingPizza = await this.pizzaModel.findById(id).exec();

    // If the pizza doesn't exist, return null.
    if (!existingPizza) {
      return null;
    }

    // Update the pizza's properties if new values are provided.
    if (updatePizzaDto.name) {
      existingPizza.name = updatePizzaDto.name;
    }
    if (updatePizzaDto.size) {
      existingPizza.size = updatePizzaDto.size;
    }
    if (updatePizzaDto.price) {
      existingPizza.price = updatePizzaDto.price;
    }

    // Save the updated pizza and return it.
    return existingPizza.save();
  }

  // This method removes a pizza from the database.
  async remove(id: string): Promise<Boolean> {
    // We find the pizza by its ID and delete it.
    const deletedPizza = await this.pizzaModel.findByIdAndDelete(id).exec();
    // If the pizza was not found, we return null.
    if (!deletedPizza) {
      return false;
    }
    return true;
  }
}
