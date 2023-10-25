import { ApiProperty } from "@nestjs/swagger";
import { ProductGetOneRequest, ProductGetOneResponse } from "@clients";

export class ProductGetOneRequestDto implements ProductGetOneRequest {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
}


export class ProductGetOneResponseDto implements ProductGetOneResponse {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
    
    @ApiProperty({
        example: 'books'
    })
    title: string

    @ApiProperty({
        example: 55000
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
  
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    subCategoryId: string

    @ApiProperty({
        example: '2023.07.17'
    })
    createAt: string

    @ApiProperty({
        example: '2023.07.17'
    })
    updateAt: string

    @ApiProperty({
        example: 'null'
    })
    deleteAt: string
}