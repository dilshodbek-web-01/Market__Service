import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { subCategoryGetAllRequest } from '../interfaces'

export class subCategoryGetAllDto implements subCategoryGetAllRequest {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageOffset?: number

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageLimit?: number
}
