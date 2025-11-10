import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly customerName: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly pizzas: string[];
}
