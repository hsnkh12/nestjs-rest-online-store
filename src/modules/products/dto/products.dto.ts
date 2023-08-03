import { IsString, IsOptional, IsNumber } from "class-validator";
import { Categories } from "../models/categories.entity";
import { Products } from "../models/products.entity";
import { DeepPartial } from "typeorm";


export class CreateProductsDTO {

    @IsString()
    name : string 

    @IsNumber()
    price : number

    @IsString()
    description : string

    @IsString()
    category : DeepPartial<Categories> 

}


export class CreateProductSpecDTO {

    @IsNumber()
    product : DeepPartial<Products>

    @IsString()
    second_name : string 

    @IsString()
    color : string 
}


export class ProductsQueryDTO {

    @IsString()
    @IsOptional()
    price : number

    @IsString()
    category_name : string
}


export class ProductSpecQueryDTO {


    @IsString()
    product_name : string

    @IsString()
    @IsOptional()
    color : string
}