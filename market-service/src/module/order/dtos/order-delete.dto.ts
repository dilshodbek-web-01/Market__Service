import { IsUUID, IsNotEmpty } from 'class-validator'
import { OrderDeleteRequest } from "../interfaces";

export class OrderDeleteRequestDto implements OrderDeleteRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string
}