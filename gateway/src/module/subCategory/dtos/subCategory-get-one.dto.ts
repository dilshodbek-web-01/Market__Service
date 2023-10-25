import { ApiProperty } from "@nestjs/swagger";
import { getProductsResponse, getSubCategoryWithProductsRequest, getSubCategoryWithProductsResponse } from "@clients";

export class getSubCategoryWithProductsRequestDto implements getSubCategoryWithProductsRequest {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
}

export class getProductsResponseDto implements getProductsResponse {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string

    @ApiProperty({
        example: 'books'
    })
    title: string

    @ApiProperty({
        example: 59000
    })
    price: number

    @ApiProperty({
        example: 'https://www.google.com/search'
    })
    image: string

    @ApiProperty({
        example: 'status'
    })
    status: string
}

export class getSubCategoryWithProductsResponseDto implements getSubCategoryWithProductsResponse {
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
        type: getProductsResponseDto
    })
    product: getProductsResponse[]
}