import { IsUUID, IsString, IsNotEmpty  } from 'class-validator'
import { CategoryUpdateRequest } from "../interfaces";

export class CategoryUpdateDto implements CategoryUpdateRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    title?: string
}