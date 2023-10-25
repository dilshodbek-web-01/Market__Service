import { OrderDeleteRequest } from "@clients";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDeleteRequestDto implements OrderDeleteRequest {
    @ApiProperty({
        example: '8760e561-29fb-4c4a-9e7f-0386cc9820e9'
    })
    id: string
}