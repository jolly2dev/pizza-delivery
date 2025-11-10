import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../schemas/order.schema';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
