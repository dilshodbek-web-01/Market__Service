import { IsString, IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, IsPhoneNumber } from "class-validator";
import type { SignUpRequest } from "../interfaces";

export class SignUpDto implements SignUpRequest {
    @MaxLength(32)
    @IsString()
    @IsNotEmpty()
    username: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string
}