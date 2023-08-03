import { Controller } from "@nestjs/common";
import { CategoriesService } from "../services/categories.service";
import { Post, Put, Get, Delete, Req, Res, Body, Param } from "@nestjs/common";
import {  Response } from 'express';
import { CreateCategoriesDTO } from "../dto/categories.dto";
import { UnauthorizedException } from "@nestjs/common";

@Controller("categories")
export class CategoriesController{

    constructor(private readonly categoriesService: CategoriesService){}

    @Get("/")
    async list( @Res() res: Response){
        const categories = await this.categoriesService.findAllCategories()
        res.status(200).json(categories)
    }

    @Get("/:name")
    async get( @Res() res: Response, @Param("name") category_name : string){
        const category = await this.categoriesService.findOneCategory(category_name)
        res.status(200).json(category)
    }

    @Post("/")
    async post( @Res() res: Response, @Body() body: CreateCategoriesDTO, @Req() req){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        const category = await this.categoriesService.createCategory(body)
        res.status(201).json(category)
    }

    @Put("/:name")
    async put( @Res() res: Response,@Body() body: CreateCategoriesDTO, @Param("name") category_name : string, @Req() req){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        const category = await this.categoriesService.updateCategory(category_name, body)
        res.status(201).json(category)
    }

    @Delete("/:name")
    async delete(@Res() res: Response,@Body() body: CreateCategoriesDTO, @Param("name") category_name : string, @Req() req){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        await this.categoriesService.deleteCategory(category_name)
        res.status(201).send(true)
    }

}