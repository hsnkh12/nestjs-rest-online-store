import { Entity, Column, Unique, PrimaryColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { UUID } from "crypto";



@Entity("Categories")
export class Categories{
    @PrimaryColumn()
    category_name : string

    @OneToMany(() => Products, p => p.product_id)
    products: Products[];
}