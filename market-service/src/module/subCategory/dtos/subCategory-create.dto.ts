import { IsUUID, IsString, IsNotEmpty } from 'class-validator'
import type { subCategoryCreateRequest } from '../interfaces'

export class subCategoryCreateDto implements subCategoryCreateRequest {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsUUID()
  @IsNotEmpty()
  categoryId: string
}
