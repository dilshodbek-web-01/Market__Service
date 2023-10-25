import { ApiProperty } from "@nestjs/swagger";
import { getCategoryWithSubCategoryRequest, getCategoryWithSubCategoryResponse, getSubCategoryResponse } from "@clients";

export class getCategoryWithSubCategoryRequestDto implements getCategoryWithSubCategoryRequest {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
}

export class getSubCategoryResponseDto implements getSubCategoryResponse {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string

    @ApiProperty({
        example: 'books'
    })
    title: string
}

export class getCategoryWithSubCategoryResponseDto implements getCategoryWithSubCategoryResponse {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string

    @ApiProperty({
        example: 'books'
    })
    title: string

    @ApiProperty({
        isArray: true,
        type: getSubCategoryResponseDto
    })
    sub_category: getSubCategoryResponse[]
}
