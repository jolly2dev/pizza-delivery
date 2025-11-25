import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../schemas/order.schema';

// This class defines the data transfer object for updating an order.
// Only the status of the order can be updated.
export class UpdateOrderDto {
  // The new status of the order. It's optional.
  @IsOptional()
  @IsEnum(OrderStatus)
  readonly status?: OrderStatus;
}
