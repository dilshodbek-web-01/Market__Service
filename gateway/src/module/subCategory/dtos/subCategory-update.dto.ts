import { ApiProperty } from "@nestjs/swagger";
import { subCategoryUpdateRequest } from "@clients";

export class subCategoryUpdateRequestBodyDto implements Omit<subCategoryUpdateRequest, 'id'> {
    @ApiProperty({
        example: 'books'
    })
    title?: string;

    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    categoryId?: string
}

export class subCategoryUpdateRequestIdDto implements Pick<subCategoryUpdateRequest, 'id'> {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string;
}