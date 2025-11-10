import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
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
  findOne(@Param('id') id: string): Promise<Pizza> {
    return this.pizzaService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Promise<Pizza> {
    return this.pizzaService.update(id, updatePizzaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Pizza> {
    return this.pizzaService.remove(id);
  }
}
