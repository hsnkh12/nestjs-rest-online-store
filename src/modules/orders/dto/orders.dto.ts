import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Cart, Item } from "../interfaces/cart.interface";
import { DeepPartial } from "typeorm";
import { Users } from "src/modules/users/models/users.entity";


// export class ItemDTO implements Item{

//     @IsString()
//     product_id : string 
//     @IsString()
//     product_a_id : string
//     @IsString()
//     product_name : string
//     @IsNumber()
//     quantity : number
//     @IsNumber()
//     total_price : number
// }

export class CreateOrderDTO{
    @IsString()
    user_id : DeepPartial<Users>
    @IsString()
    status : string
}


export class OrdersQuery{
    @IsString()
    @IsOptional()
    status : string
}

export class ItemDTO implements Item{


    @IsString()
    product_id : string 
    @IsString()
    product_a_id : string
    @IsString()
    product_name : string
    @IsNumber()
    quantity : number
    @IsNumber()
    total_price : number

    
}

export class CartDTO implements Cart{

    @IsNumber()
    total_price : number
    @IsArray()
    items: Item[]
}

export class AddressDTO {

    @IsString()
    postal_code : string 

    @IsString()
    city : string 

    @IsString()
    state : string 

    @IsString()
    address : string 
}