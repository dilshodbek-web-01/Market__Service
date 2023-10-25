import { IsUUID, IsNotEmpty, IsString, IsArray } from 'class-validator'
import { getCategoryWithSubCategoryRequest, getCategoryWithSubCategoryResponse, getSubCategoryRequest } from "../interfaces";

export class getCategoryWithSubCategoryRequestDto implements getCategoryWithSubCategoryRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string
}

export class subCategory implements getSubCategoryRequest {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    title: string
}

export class getCategoryWithSubCategoryResponseDto implements getCategoryWithSubCategoryResponse {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsArray()
    sub_category: getSubCategoryRequest[]
}