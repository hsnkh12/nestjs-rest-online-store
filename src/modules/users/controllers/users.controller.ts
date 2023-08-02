import { Controller, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { Get, Put, Delete } from "@nestjs/common";
import { Param, Body, Res, Req} from "@nestjs/common";
import {  Response } from 'express';
import { UpdateUserDTO } from '../dto/users.dto';

@Controller("users")
export class UsersController{

    constructor( 
        private readonly usersService: UsersService,
    ){}

    @Get("/")
    async list(@Req() req, @Res() res: Response){

        // Allow if only admin
        if(!req.user.is_admin){
            throw new UnauthorizedException()
        }

        const users = await this.usersService.findUsers()
        res.status(200).json(users)
    }

    @Get("/:id")
    async get(@Req() req, @Res() res: Response, @Param("id") user_id:string ){
        
        const user = await this.usersService.findOneUser(user_id)
        
        // Allow if either admin or the user himself
        if(!req.user.is_admin && user.user_id != req.user.user_id){
            throw new UnauthorizedException()
        }
        res.status(200).json(user)
    }

    @Put("/:id")
    async update(@Req() req, @Res() res: Response, @Body() body:UpdateUserDTO, @Param("id") user_id:string){

        // Allow if either user himself or admin
        if(user_id != req.user.user_id && !req.user.is_admin){
            throw new UnauthorizedException()
        }
        await this.usersService.updateUser(body, user_id)
        res.status(201).send(true)
    }

    @Delete("/:id")
    async delete(@Req() req, @Res() res: Response, @Param("id") user_id:string){

        // Allow if either user himself or admin
        if(user_id != req.user.user_id && !req.user.is_admin){
            throw new UnauthorizedException()
        }

        await this.usersService.deleteUser(user_id, )
        res.status(201).send(true)

    }
}