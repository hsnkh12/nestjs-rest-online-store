import { IsString } from "class-validator";



export class SigninDTO{

    @IsString()
    username: string;

    @IsString()
    password: string;
}


export class ResetPasswordDTO{

    @IsString()
    old_password: string;

    @IsString()
    new_password: string;
}