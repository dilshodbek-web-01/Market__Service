import { IsUUID, IsNotEmpty } from 'class-validator'
import { CategoryDeleteResponse } from "../interfaces";

export class CategoryDeleteDto implements CategoryDeleteResponse {
    @IsUUID()
    @IsNotEmpty()
    id: string
}