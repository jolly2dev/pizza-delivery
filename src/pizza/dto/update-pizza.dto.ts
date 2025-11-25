import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PizzaSize } from '../schemas/pizza.schema';

export class UpdatePizzaDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEnum(PizzaSize)
  @IsOptional()
  readonly size?: PizzaSize;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly toppings?: string[];
}
