import { Controller, Body, Post, HttpCode, HttpStatus, Headers } from "@nestjs/common";
import { UserService } from "@clients";
import { ApiTags, ApiBody, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import {  SignInRequestDto, SignInResponseDto, SignUpRequestDto, SignUpResponseDto } from "./dtos";
import type { SignUpRequest, SignInRequest, SignOutRequest } from '@clients'

@ApiTags('Auth')
@Controller({
    path: 'user-service',
    version: '1'
})
export class UserController {
    readonly #_service: UserService

    constructor(service: UserService) {
        this.#_service = service
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-up')
    @ApiBody({ type: SignUpRequestDto })
    @ApiOkResponse({ type: SignUpResponseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({ description: 'Bad request'})
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    signUp(
        @Body() body: SignUpRequest
    ) {                
        return this.#_service.signUp(body)
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    @ApiBody({ type: SignInRequestDto })
    @ApiOkResponse({ type: SignInResponseDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({ description: 'Bad request'})
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    signIn(
        @Body() body: SignInRequest
    ) {
        return this.#_service.signIn(body)
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-out')
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({ description: 'Bad request'})
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    signOut(
        @Headers() headers: SignOutRequest
    ) {        
        return this.#_service.signOut(headers)
    }
}