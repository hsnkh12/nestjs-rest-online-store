import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class SigninDTO{

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}


export class ResetPasswordDTO{

    @ApiProperty()
    @IsString()
    old_password: string;

    @ApiProperty()
    @IsString()
    new_password: string;
}