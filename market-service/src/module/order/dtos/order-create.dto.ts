import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import type { OrderCreateRequest } from '../interfaces';

export class OrderCreateRequestDto implements OrderCreateRequest {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
