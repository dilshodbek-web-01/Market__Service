import { IsUUID, IsNotEmpty } from 'class-validator'
import { ProductGetOneRequest } from "../interfaces";

export class ProductGetOneDto implements ProductGetOneRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string
}