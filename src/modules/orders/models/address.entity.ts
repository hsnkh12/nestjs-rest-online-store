import { Users } from "src/modules/users/models/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";


@Entity("Addresses")
export class Addresses{

    @PrimaryColumn()
    address_title : string

    @ManyToOne(() => Users, o => o.addresses)
    user: Users

    @OneToMany(() => Orders, o => o.address)
    orders: Orders[]

    @Column({nullable: true})
    postal_code : string 
    
    @Column({nullable: true})
    state : string 

    @Column({nullable: true})
    city : string

    @Column({nullable: true})
    address : string 

}