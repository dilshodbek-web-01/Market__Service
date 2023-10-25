import { ApiProperty } from "@nestjs/swagger";
import { subCategoryGetAllResponse } from "@clients";

export class subCategoryGetAllResponseDto implements subCategoryGetAllResponse {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string

    @ApiProperty({
        example: 'uzum'
    })
    title: string
}