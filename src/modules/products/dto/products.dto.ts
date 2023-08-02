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
    category_name : DeepPartial<Categories> 
}


export class CreateProductAttrsDTO {

    @IsString()
    product_id : DeepPartial<Products>

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
    category_name : DeepPartial<Categories>
}


export class ProductAttrsQueryDTO {


    @IsString()
    product_id : DeepPartial<Products>

    @IsString()
    @IsOptional()
    color : string
}