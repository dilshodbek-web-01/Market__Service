import { ApiProperty } from "@nestjs/swagger";
import { CategoryUpdateRequest } from "@clients";

export class CategoryUpdateRequestBodyDto implements Pick<CategoryUpdateRequest, 'title'> {
    @ApiProperty({
        example: 'books'
    })
    title?: string;
}

export class CategoryUpdateRequestIdDto implements Pick<CategoryUpdateRequest, 'id'> {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string;
}