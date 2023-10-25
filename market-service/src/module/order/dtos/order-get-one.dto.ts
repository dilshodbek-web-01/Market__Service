import { IsUUID, IsNotEmpty } from 'class-validator'
import { OrderGetOneRequest } from "../interfaces";

export class OrderGetOneRequestDto implements OrderGetOneRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string
}