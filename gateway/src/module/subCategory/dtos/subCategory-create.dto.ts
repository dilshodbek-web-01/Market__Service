import { ApiProperty } from "@nestjs/swagger";
import { subCategoryCreateRequest } from "@clients";

export class subCategoryCreateRequestDto implements subCategoryCreateRequest {
    @ApiProperty({
        example: 'books'
    })
    title: string

    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    categoryId: string
}