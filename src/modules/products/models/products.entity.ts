import { Entity, Column, OneToMany, ManyToOne , PrimaryGeneratedColumn, Unique} from "typeorm";
import { Categories } from "./categories.entity";

@Entity("Products")
@Unique(["name"])
export class Products{

    @PrimaryGeneratedColumn('uuid')
    product_id : string 

    @Column()
    name : string 

    @Column()
    price : number 

    @ManyToOne(() => Categories, cat => cat.products)
    category_name: Categories;

    @OneToMany(() => ProductAttributes, pa => pa.product_a_id)
    attributes: ProductAttributes[];
    
}

@Entity("Product_attibute")
export class ProductAttributes{

    @PrimaryGeneratedColumn('uuid')
    product_a_id : string 

    @ManyToOne(() => Products, p => p.attributes)
    product_id: Products;

    @Column()
    second_name : string

    @Column()
    color : string

}