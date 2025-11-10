import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { PizzaSize } from '../schemas/pizza.schema';

export class CreatePizzaDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(PizzaSize)
  @IsNotEmpty()
  readonly size: PizzaSize;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsArray()
  @IsString({ each: true })
  readonly toppings: string[];
}
