import { ApiProperty } from "@nestjs/swagger";
import { CategoryCreateRequest } from "@clients";

export class CategoryCreateRequestDto implements CategoryCreateRequest {
    @ApiProperty({
        example: 'books'
    })
    title: string
}