import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Users } from "src/modules/users/models/users.entity";
import { Addresses } from "./address.entity";
import { Cart } from "../interfaces/cart.interface";





@Entity("Orders")
export class Orders{

    @PrimaryGeneratedColumn("uuid")
    order_id : string 

    @ManyToOne(() => Users, o => o.orders)
    user: Users

    @Column('json', {nullable: true})
    cart: Cart;

    @Column({nullable: true})
    total_price : number 

    @Column()
    status : string

    @ManyToOne(() => Addresses, o => o.orders, {nullable: true})
    address: Addresses

    @Column({default: false})
    is_submitted : boolean

    @Column({nullable: true})
    date_submitted : Date
}