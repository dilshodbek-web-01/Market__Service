import { ApiProperty } from "@nestjs/swagger";
import { OrderUpdateRequest } from "@clients";

export class OrderUpdateRequestBodyDto implements Omit<OrderUpdateRequest, 'id'> {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    productId: string

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkZThkNTg4LWUwYzItNGQ4Ni05ZTU2LTllOGJjNTA1ZDdmYSIsImlhdCI6MTY4OTg1NjA3NywiZXhwIjoxNjg5ODYyNjc3fQ.rUinfTSFm248ky5zSZfrP78mr3RgGy_kYtf_U6iD_yc'
    })
    token: string
}

export class OrderUpdateRequestIdDto implements Pick<OrderUpdateRequest, 'id'> {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
} 