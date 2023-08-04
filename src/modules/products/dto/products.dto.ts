import { IsString, IsOptional, IsNumber } from "class-validator";
import { Categories } from "../models/categories.entity";
import { Products } from "../models/products.entity";
import { DeepPartial } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductsDTO {

    @IsString()
    @ApiProperty()
    name : string 

    @IsNumber()
    @ApiProperty()
    price : number

    @IsString()
    @ApiProperty()
    description : string

    @IsString()
    @ApiProperty()
    category : DeepPartial<Categories> 

}


export class CreateProductSpecDTO {

    @IsString()
    @ApiProperty()
    product_name : DeepPartial<Products>

    @IsString()
    @ApiProperty()
    second_name : string 

    @IsString()
    @ApiProperty()
    color : string 
}


export class ProductsQueryDTO {

    @IsString()
    category_name : string
}


export class ProductSpecQueryDTO {


    @IsString()
    product_name : string
}