import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "../models/orders.entity";
import { Repository, DeepPartial } from 'typeorm';
import { OrdersQuery, CreateOrderDTO, AddressDTO, CartDTO } from '../dto/orders.dto';
import { Users } from "src/modules/users/models/users.entity";



@Injectable()
export class OrdersService{

    constructor( @InjectRepository(Orders) private readonly OrdersRep : Repository<Orders>){}

    async findAllOrders(query: OrdersQuery){

        if(query.status){
            return this.OrdersRep.find({ where: {state: query.status}})
        }

        return this.OrdersRep.find()
    }

    async findOneOrder(order_id : string){

        const order = await this.OrdersRep.findOne({where: {order_id:order_id}, relations: ["user_id"]})

        if (!order){
            throw new NotFoundException()
        }
        return order
    }

    async createOrder(user_id : string){

        try{

            const user : DeepPartial<Users> = {
                user_id : user_id
            }
            
            const data : DeepPartial<Orders> = {
                user_id : user,
                status : "p"
            }

            const order = this.OrdersRep.create(data)
            return this.OrdersRep.save(order)

        } catch(err) {
            console.log(err)
            throw new BadRequestException()
        }
    }

    async submitAddressToOrder(order_id : string, data : AddressDTO, user_id : string){


        const user : DeepPartial<Users> = {
            user_id : user_id
        }

        const order = await this.OrdersRep.preload({ 
            order_id, 
            user_id: user
        })
        if(!order){
            throw new NotFoundException()
        }

        if(order.is_submitted == true){
            throw new BadRequestException()
        }

        return this.OrdersRep.save({...order, ...data})
    }

    async submitCartToOrder(order_id : string, data : CartDTO, user_id : string){

        const user : DeepPartial<Users> = {
            user_id : user_id
        }

        const order = await this.OrdersRep.preload({ 
            order_id, 
            user_id : user,
            
        })

        if(!order){
            throw new NotFoundException()
        }

        if(order.is_submitted == true){
            throw new BadRequestException()
        }

        order.total_price =data.total_price,
        order.cart =  data

        return this.OrdersRep.save(order)
    }

    async submitOrder(order_id : string, user_id : string){

        const user : DeepPartial<Users> = {
            user_id : user_id
        }

        const order = await this.OrdersRep.preload({ 
            order_id, 
            user_id : user,
        })

        if(!order){
            throw new NotFoundException()
        }

        if(order.is_submitted == true && order.cart && order.address){
            throw new BadRequestException()
        }

        order.date_submitted = new Date()
        order.status = "S"
        order.is_submitted = true

        return this.OrdersRep.save(order)
    }

    async deleteOrder(order_id : string){
        const order = await this.findOneOrder(order_id)
        return this.OrdersRep.delete(order)
    }




}