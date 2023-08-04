import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";


export class CreateUserDTO{


    @IsString()
    @ApiProperty()
    username: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}


export class UpdateUserDTO{

    @IsString()
    @ApiProperty()
    username: string;

    @IsEmail()
    @ApiProperty()
    email: string;
}