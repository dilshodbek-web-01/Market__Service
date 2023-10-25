import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { CategoryGetAllRequest } from '../interfaces'

export class CategoryGetAllDto implements CategoryGetAllRequest {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageOffset?: number

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageLimit?: number
}
