import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"




export class AddressDTO {


    @IsString()
    @ApiProperty()
    address_title : string 

    @IsString()
    @ApiProperty()
    postal_code : string 

    @IsString()
    @ApiProperty()
    city : string 

    @IsString()
    @ApiProperty()
    state : string 

    @IsString()
    @ApiProperty()
    address : string 
}