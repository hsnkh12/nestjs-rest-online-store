import { Orders } from "src/modules/orders/models/orders.entity";
import { Entity, Column, Unique, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";


@Entity("Users")
@Unique(["username"])
export class Users{

    @PrimaryGeneratedColumn('uuid')
    user_id : string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string 

    @Column({default: false})
    is_admin: boolean

    @OneToMany(() => Orders, o => o.order_id)
    orders: Orders[]
}