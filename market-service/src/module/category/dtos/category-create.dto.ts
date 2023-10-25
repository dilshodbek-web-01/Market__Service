import { IsString, IsNotEmpty } from 'class-validator'
import type { CategoryCreateRequest } from '../interfaces'

export class CategoryCreateDto implements CategoryCreateRequest {
  @IsString()
  @IsNotEmpty()
  title: string
}
