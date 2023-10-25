import { IsUUID, IsString, IsNotEmpty, IsOptional  } from 'class-validator'
import { subCategoryUpdateRequest } from "../interfaces";

export class subCategoryUpdateDto implements subCategoryUpdateRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsOptional()
    title?: string

    @IsUUID()
    @IsOptional()
    categoryId?: string
}