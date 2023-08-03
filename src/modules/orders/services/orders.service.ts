import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "../models/orders.entity";
import { Repository, DeepPartial } from 'typeorm';
import { OrdersQuery, CartDTO } from '../dto/orders.dto';
import { Users } from "src/modules/users/models/users.entity";
import { Addresses } from "../models/address.entity";
import { Cart } from "../interfaces/cart.interface";



@Injectable()
export class OrdersService{

    constructor( @InjectRepository(Orders) private readonly OrdersRep : Repository<Orders>){}

    async findAllOrders(query: OrdersQuery){

        if(query.status){
            return this.OrdersRep.find({ where: {status: query.status}})
        }

        return this.OrdersRep.find()
    }

    async findOneOrder(order_id : string){

        const order = await this.OrdersRep.findOne({where: {order_id:order_id}, relations: ["user","address"]})

        if (!order){
            throw new NotFoundException("Order not found")
        }
        return order
    }

    async createOrder(user_id : string){

        try{

            const user : DeepPartial<Users> = {
                user_id : user_id
            }
            
            const data : DeepPartial<Orders> = {
                user : user,
                status : "p"
            }

            const order = this.OrdersRep.create(data)
            return this.OrdersRep.save(order)

        } catch(err) {
            console.log(err)
            throw new BadRequestException()
        }
    }

    async submitAddressToOrder(order_id : string, address_title : string, user_id : string){


        const user : DeepPartial<Users> = {
            user_id : user_id
        }

        const address : DeepPartial<Addresses> = {
            address_title: address_title,
            user : user
        }

        if (!address){
            throw new BadRequestException("Invalid address title")
        }

        const order = await this.OrdersRep.preload({ 
            order_id, 
            user: user
        })
        if(!order){
            throw new NotFoundException("Order not found")
        }

        if(order.is_submitted == true){
            throw new BadRequestException("Order is already submitted")
        }

        return this.OrdersRep.save({...order, address})
    }

    async submitCartToOrder(order_id : string, data : Cart, user_id : string){

        const user : DeepPartial<Users> = {
            user_id : user_id
        }

        const order = await this.OrdersRep.preload({ 
            order_id, 
            user: user,
            
        })

        if(!order){
            throw new NotFoundException("Order not found")
        }

        if(order.is_submitted == true){
            throw new BadRequestException("Order is already submitted")
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
            user: user,
        })

        if(!order){
            throw new NotFoundException("Order not found")
        }

        if(order.is_submitted == true || order.cart == null ){
            throw new BadRequestException("Invalid order submission")
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