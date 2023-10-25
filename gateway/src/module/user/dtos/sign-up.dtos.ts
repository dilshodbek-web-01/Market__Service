import { ApiProperty } from "@nestjs/swagger";
import type { SignUpRequest, SignUpResponse } from "@clients";

export class SignUpRequestDto implements SignUpRequest {
    @ApiProperty({
        example: 'user'
    })
    username: string

    @ApiProperty({
        example: 'user@123A'
    })
    password: string

    @ApiProperty({
        example: 'user@gmail.com'
    })
    email: string

    @ApiProperty({
        example: '+998901234567'
    })
    phone: string

}

export class SignUpResponseDto implements SignUpResponse {
    @ApiProperty({
        example: 'Bearer token...'
    })
    accessToken: string

    @ApiProperty({
        example: 'token....'
    })
    refreshToken: string
}