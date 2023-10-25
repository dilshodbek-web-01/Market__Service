import { ApiProperty } from "@nestjs/swagger";
import { OrderCreateRequest } from "@clients";

export class OrderCreateRequestDto implements OrderCreateRequest {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    productId: string

    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    token: string
}