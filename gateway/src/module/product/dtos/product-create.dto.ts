import { ApiProperty } from "@nestjs/swagger";
import { ProductCreateRequest } from "@clients";

export class ProductCreateRequestDto implements ProductCreateRequest {
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
    status?: string
  
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    subCategoryId: string
}