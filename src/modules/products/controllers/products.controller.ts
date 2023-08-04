import { Controller, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Post, Put, Get, Delete, Req, Res, Body, Param, Query } from "@nestjs/common";
import {  Response } from 'express';
import { ProductsService } from "../services/products.service";
import { ProductsQueryDTO, ProductSpecQueryDTO, CreateProductsDTO, CreateProductSpecDTO} from "../dto/products.dto";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller("products")
@ApiBearerAuth()
export class ProductsController{

    constructor( 
        private readonly productService : ProductsService
    ){}

    @Get("spec/")
    async listAttrs(@Res() res:Response, @Query() query:ProductSpecQueryDTO){
        const attrs = await this.productService.findAllProductAttrs(query)
        res.status(200).json(attrs)
    }

    @Post("spec/")
    async postAttr(@Res() res:Response, @Req() req, @Body() body:CreateProductSpecDTO){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }

        const attr = await this.productService.createProductAttrs(body)
        res.status(201).json(attr)
    }

    @Get("spec/:product_spec_id")
    async getAttr(@Res() res:Response, @Param("product_spec_id") product_a_id : string){
        const attr = await this.productService.findOneProductAttr(product_a_id)
        res.status(200).json(attr)
    }

    @Put("spec/:product_spec_id")
    async putAttr(@Res() res:Response, @Req() req, @Body() body:CreateProductSpecDTO, @Param("product_spec_id") product_a_id :string){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        
        const attr = await this.productService.updateProductAttr(product_a_id, body)
        res.status(201).json(attr)
    }

    @Delete("spec/:product_spec_id")
    async deleteAttr(@Res() res:Response, @Req() req, @Param("product_spec_id") id:string){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        await this.productService.deleteProductAttr(id)
        res.status(201).send(true)
    }

    @Get("/")
    async listProducts(@Res() res:Response, @Query() query:ProductsQueryDTO){
        const products = await this.productService.findAllProducts(query)
        res.status(200).json(products)
    }

    @Get("/:product_id")
    async getProduct(@Res() res:Response, @Param("product_id") product_id:number){
        const product = await this.productService.findOneProduct(product_id)
        res.status(200).json(product)
    }

    @Post("/")
    async postProduct(@Res() res:Response, @Req() req, @Body() body:CreateProductsDTO){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }

        const product = await this.productService.createProduct(body)
        res.status(201).json(product)
    }

    
    @Put("/:product_id")
    async putProduct(@Res() res:Response, @Req() req, @Body() body:CreateProductsDTO, @Param("product_id") product_id:number){
        
        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        
        const product = await this.productService.updateProduct(product_id, body)
        res.status(201).json(product)
    }

    @Delete("/:id")
    async deleteProduct(@Res() res:Response, @Req() req, @Param("id") product_id:number){
        
        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        
        await this.productService.deleteProduct(product_id)
        res.status(201).send(true)
    }

    
}