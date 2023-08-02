import { Controller, UnauthorizedException } from "@nestjs/common";
import { Post, Put, Get, Delete, Req, Res, Body, Param, Query } from "@nestjs/common";
import { AddressDTO, CartDTO, OrdersQuery } from "../dto/orders.dto";
import { OrdersService } from '../services/orders.service';


@Controller("orders")
export class OrdersController{

    constructor(private readonly  ordersService : OrdersService ){}


    @Get("/")
    async listOrders(@Req() req, @Res() res, @Query() query :OrdersQuery){
        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        const orders = await this.ordersService.findAllOrders(query)
        res.status(200).json(orders)
    }

    @Get("/:id")
    async getOrder(@Req() req, @Res() res, @Param("id") order_id : string){
        const order = await this.ordersService.findOneOrder(order_id)
        if (!req.user.is_admin&&order.user_id != req.user.user_id){
            throw new UnauthorizedException()
        }
        res.status(200).json(order)
    }

    @Post("/")
    async createOrder(@Req() req, @Res() res){
        const order = await this.ordersService.createOrder(req.user.user_id)
        res.status(201).json(order)
    }

    @Post("address/:id")
    async submitAddress(@Req() req, @Res() res, @Body() body: AddressDTO, @Param("id") order_id:string){
        const order = await this.ordersService.submitAddressToOrder(order_id, body, req.user.user_id)
        res.status(201).json(order)
    }

    @Post("cart/:id")
    async submitCart(@Req() req, @Res() res, @Body() body: CartDTO, @Param("id") order_id:string){
        const order = await this.ordersService.submitCartToOrder(order_id, body, req.user.user_id)
        res.status(201).json(order)
    }

    @Post("/:id")
    async submitOrder(@Req() req, @Res() res, @Param("id") order_id:string){
        const order = await this.ordersService.submitOrder(order_id, req.user.user_id)
        res.status(201).json(order)
    }

    @Delete("/:id")
    async deleteOrder(@Req() req, @Res() res, @Param("id") order_id:string){
        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        await this.ordersService.deleteOrder(order_id)
        res.status(201).send(true)
    }


}