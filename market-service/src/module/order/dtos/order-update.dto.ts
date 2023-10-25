import { IsUUID, IsString, IsNotEmpty } from 'class-validator'
import { OrderUpdateRequest } from "../interfaces";

export class OrderUpdateRequestDto implements OrderUpdateRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsUUID()
    @IsNotEmpty()
    productId?: string

    @IsString()
    @IsNotEmpty()
    token?: string
}