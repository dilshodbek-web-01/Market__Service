import { ApiProperty } from "@nestjs/swagger";
import { ProductDeleteRequest } from "@clients";

export class ProductDeleteRequestDto implements ProductDeleteRequest {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
}