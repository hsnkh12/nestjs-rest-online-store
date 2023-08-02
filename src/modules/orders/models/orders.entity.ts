import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "../interfaces/cart.interface";
import { Users } from "src/modules/users/models/users.entity";


@Entity("Orders")
export class Orders{

    @PrimaryGeneratedColumn("uuid")
    order_id : string 

    @ManyToOne(() => Users, o => o.orders)
    user_id: Users

    @Column('json', {nullable: true})
    cart: Cart;

    @Column({nullable: true})
    total_price : number 

    @Column()
    status : string

    @Column({default: false})
    is_submitted : boolean

    @Column({nullable: true})
    postal_code : string 
    
    @Column({nullable: true})
    state : string 

    @Column({nullable: true})
    city : string

    @Column({nullable: true})
    address : string 

    @Column({nullable: true})
    date_submitted : Date
}