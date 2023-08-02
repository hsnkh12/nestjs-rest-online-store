import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Products } from "./products.entity";




@Entity("Categories")
export class Categories{
    @PrimaryColumn()
    category_name : string

    @OneToMany(() => Products, p => p.product_id)
    products: Products[];
}