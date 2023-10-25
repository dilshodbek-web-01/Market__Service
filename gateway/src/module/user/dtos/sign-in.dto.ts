import { ApiProperty } from "@nestjs/swagger";
import type { SignInRequest, SignInResponse } from "@clients";

export class SignInRequestDto implements SignInRequest {
    @ApiProperty({
        example: 'user'
    })
    username: string

    @ApiProperty({
        example: 'user@123A'
    })
    password: string
}

export class SignInResponseDto implements SignInResponse {
    @ApiProperty({
        example: 'Bearer token...'
    })
    accessToken: string

    @ApiProperty({
        example: 'token....'
    })
    refreshToken: string
}