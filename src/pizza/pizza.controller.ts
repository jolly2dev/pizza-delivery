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
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './schemas/pizza.schema';

// This controller handles all incoming requests for the /pizzas endpoint.
@Controller('pizzas')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  // This endpoint creates a new pizza.
  // It uses the @Post() decorator to handle POST requests.
  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.pizzaService.create(createPizzaDto);
  }

  // This endpoint gets all the pizzas.
  // It uses the @Get() decorator to handle GET requests.
  @Get()
  findAll(): Promise<Pizza[]> {
    return this.pizzaService.findAll();
  }

  // This endpoint gets a single pizza by its ID.
  // It uses a route parameter :id to get the pizza's ID from the URL.
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pizza> {
    const pizza = await this.pizzaService.findOne(id);
    // If the pizza is not found, we throw a 404 Not Found error.
    if (!pizza) {
      throw new NotFoundException(`Pizza ID ${id} not found`);
    }
    return pizza;
  }

  // This endpoint updates a pizza.
  // It uses the @Put() decorator to handle PUT requests.
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza> {
    const pizza = await this.pizzaService.update(id, updatePizzaDto);
    // If the pizza is not found, we throw a 404 Not Found error.
    if (!pizza) {
      throw new NotFoundException(`Pizza ID ${id} not found`);
    }
    return pizza;
  }

  // This endpoint deletes a pizza.
  // It uses the @Delete() decorator to handle DELETE requests.
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Boolean> {
    const pizzaState = await this.pizzaService.remove(id);
    // If the pizza is not found, we throw a 404 Not Found error.
    if (!pizzaState) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    return pizzaState;
  }
}
