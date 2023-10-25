import { IsUUID, IsNotEmpty } from 'class-validator'
import { getSubCategoryWithProductsRequest } from "../interfaces";

export class getSubCategoryWithProductsRequestDto implements getSubCategoryWithProductsRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string
}