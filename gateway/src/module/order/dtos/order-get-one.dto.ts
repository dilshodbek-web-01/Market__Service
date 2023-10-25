import { ApiProperty } from "@nestjs/swagger";  
import { OrderGetOneRequest, OrderGetOneResponse } from "@clients";

export class OrderGetOneRequestDto implements OrderGetOneRequest {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
}

export class OrderGetOneResponseDto implements OrderGetOneResponse {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string

    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    productId: string

    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    token: string
}