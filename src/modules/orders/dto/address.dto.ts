import { IsString } from "class-validator"




export class AddressDTO {


    @IsString()
    address_title : string 

    @IsString()
    postal_code : string 

    @IsString()
    city : string 

    @IsString()
    state : string 

    @IsString()
    address : string 
}