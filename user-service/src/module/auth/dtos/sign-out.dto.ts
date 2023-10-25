import { IsString, IsNotEmpty } from "class-validator";
import { SignOutRequest } from "../interfaces";

export class SignOutRequestDto implements SignOutRequest {
    @IsString()
    @IsNotEmpty()
    refreshtoken: string
}