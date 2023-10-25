import { IsString, IsNotEmpty, IsNumber, IsUUID, IsOptional } from 'class-validator'
import type { ProductCreateRequest } from '../interfaces'

export class ProductCreateDto implements ProductCreateRequest {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsString()
  @IsNotEmpty()
  image: string

  @IsString()
  @IsOptional()
  status?: string

  @IsUUID()
  @IsNotEmpty()
  subCategoryId: string
}
