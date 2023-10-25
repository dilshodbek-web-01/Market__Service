import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ProductGetAllRequest } from '../interfaces'

export class ProductGetAllDto implements ProductGetAllRequest {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageOffset?: number

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageLimit?: number
}
