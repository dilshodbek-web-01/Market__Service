import { IsUUID, IsString, IsNotEmpty, IsNumber, IsOptional  } from 'class-validator'
import { ProductUpdateRequest } from "../interfaces";

export class ProductUpdateDto implements ProductUpdateRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsOptional()
    title?: string

    @IsNumber()
    @IsOptional()
    price?: number
  
    @IsString()
    @IsOptional()
    image?: string
  
    @IsString()
    @IsOptional()
    status?: string
  
    @IsUUID()
    @IsOptional()
    subCategoryId?: string
}