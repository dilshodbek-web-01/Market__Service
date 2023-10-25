import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { OrderGetAllRequest } from '../interfaces'

export class OrderGetAllRequestDto implements OrderGetAllRequest {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageOffset?: number

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageLimit?: number
}