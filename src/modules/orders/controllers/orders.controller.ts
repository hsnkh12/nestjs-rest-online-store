import { Controller, UnauthorizedException } from "@nestjs/common";
import { Post, Get, Delete, Req, Res, Body, Param, Query } from "@nestjs/common";
import { CartDTO, OrdersQuery } from "../dto/orders.dto";
import { OrdersService } from '../services/orders.service';
import { Cart } from "../interfaces/cart.interface";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller("orders")
@ApiBearerAuth()
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

    @Get("/:order_id")
    async getOrder(@Req() req, @Res() res, @Param("order_id") order_id : string){
        const order = await this.ordersService.findOneOrder(order_id)
        if (!req.user.is_admin&&order.user.user_id != req.user.user_id){
            throw new UnauthorizedException()
        }
        res.status(200).json(order)
    }

    @Post("/")
    async createOrder(@Req() req, @Res() res){
        const order = await this.ordersService.createOrder(req.user.user_id)
        res.status(201).json(order)
    }

    @Post("address/:address_title/:order_id")
    async submitAddress(@Req() req, @Res() res, @Param("address_title") address_title:string, @Param("order_id") order_id:string){
        const order = await this.ordersService.submitAddressToOrder(order_id, address_title, req.user.user_id)
        res.status(201).json(order)
    }

    @Post("cart/:order_id")
    async submitCart(@Req() req, @Res() res, @Body() body: Cart, @Param("order_id") order_id:string){
        const order = await this.ordersService.submitCartToOrder(order_id, body, req.user.user_id)
        res.status(201).json(order)
    }

    @Post("/:order_id")
    async submitOrder(@Req() req, @Res() res, @Param("order_id") order_id:string){
        const order = await this.ordersService.submitOrder(order_id, req.user.user_id)
        res.status(201).json(order)
    }

    @Delete("/:order_id")
    async deleteOrder(@Req() req, @Res() res, @Param("order_id") order_id:string){
        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        await this.ordersService.deleteOrder(order_id)
        res.status(201).send(true)
    }


}