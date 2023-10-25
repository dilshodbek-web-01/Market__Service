import { IsUUID, IsNotEmpty } from 'class-validator'
import { subCategoryDeleteResponse } from "../interfaces";

export class subCategoryDeleteDto implements subCategoryDeleteResponse {
    @IsUUID()
    @IsNotEmpty()
    id: string
}