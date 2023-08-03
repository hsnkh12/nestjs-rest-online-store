import { Entity, Column, OneToMany, ManyToOne , PrimaryGeneratedColumn, Unique} from "typeorm";
import { Categories } from "./categories.entity";

@Entity("Products")
@Unique(["name"])
export class Products{

    @PrimaryGeneratedColumn()
    product_id : number 

    @Column()
    name : string 

    @Column()
    price : number 

    @Column()
    description : string

    @ManyToOne(() => Categories, category => category.products)
    category: Categories;

    @OneToMany(() => ProductSpecs, pa => pa.product)
    specifications: ProductSpecs[];
    
}

@Entity("Product_specfications")
export class ProductSpecs{

    @PrimaryGeneratedColumn('uuid')
    product_a_id : string 

    @ManyToOne(() => Products, p => p.specifications)
    product: Products;

    @Column()
    second_name : string

    @Column()
    color : string

}