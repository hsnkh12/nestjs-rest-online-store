import { Controller } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UsersService } from '../services/users.service';
import { Post, Body, Res } from "@nestjs/common";
import {  Response } from 'express';
import { SigninDTO } from "../dto/auth.dto";
import { CreateUserDTO } from "../dto/users.dto";

@Controller("auth")
export class AuthController{
    constructor( 
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ){}

    @Post("signin/")
    async signin(@Res() res:Response ,@Body() body: SigninDTO) {
        
        const token = await this.authService.authenticateUser(body)
        res.status(201).json({token: token})

    }

    @Post("signup/")
    async signup(@Res() res:Response ,@Body() body: CreateUserDTO) {
        await this.usersService.createUser(body)
        res.status(201).send(true)
    }

}