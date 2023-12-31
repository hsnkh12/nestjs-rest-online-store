import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { DeepPartial } from "typeorm";
import { Users } from "src/modules/users/models/users.entity";
import { Item } from "../interfaces/cart.interface";
import { ApiProperty } from "@nestjs/swagger";


export class CreateOrderDTO{
    @IsString()
    @ApiProperty()
    user_id : DeepPartial<Users>
    
    @IsString()
    @ApiProperty()
    status : string
}


export class OrdersQuery{
    @IsString()
    @IsOptional()
    status : string
}

export class ItemDTO{


    @IsNumber()
    product_id : number
    @IsString()
    product_a_id : string
    @IsString()
    product_full_name : string
    @IsNumber()
    quantity : number
    @IsNumber()
    total_price : number

    
}

export class CartDTO {

    @IsNumber()
    total_price : number
    @IsArray()
    items: Item[]
}

