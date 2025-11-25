import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PizzaSize } from '../schemas/pizza.schema';

// This is the DTO for updating a pizza.
// All properties are optional, so you can update just one property if you want.
export class UpdatePizzaDto {
  // The name of the pizza.
  @IsString()
  @IsOptional()
  readonly name?: string;

  // The size of the pizza.
  @IsEnum(PizzaSize)
  @IsOptional()
  readonly size?: PizzaSize;

  // The price of the pizza.
  @IsNumber()
  @IsOptional()
  readonly price?: number;

  // The toppings of the pizza.
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly toppings?: string[];
}
