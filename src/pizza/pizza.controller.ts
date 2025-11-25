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

@Controller('pizzas')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    return this.pizzaService.create(createPizzaDto);
  }

  @Get()
  findAll(): Promise<Pizza[]> {
    return this.pizzaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pizza> {
    const pizza = await this.pizzaService.findOne(id);
    if (!pizza) {
      throw new NotFoundException(`Pizza ID ${id} not found`);
    }
    return pizza;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza> {
    const pizza = await this.pizzaService.update(id, updatePizzaDto);
    if (!pizza) {
      throw new NotFoundException(`Pizza ID ${id} not found`);
    }
    return pizza;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Boolean> {
    const pizzaState = await this.pizzaService.remove(id);
    if (!pizzaState) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    return pizzaState;
  }
}
