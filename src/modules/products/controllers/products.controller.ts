import { Controller, UnauthorizedException } from "@nestjs/common";
import { Post, Put, Get, Delete, Req, Res, Body, Param, Query } from "@nestjs/common";
import { Request, Response } from 'express';
import { ProductsService } from "../services/products.service";
import { ProductsQueryDTO, ProductAttrsQueryDTO, CreateProductsDTO, CreateProductAttrsDTO} from "../dto/products.dto";


@Controller("products")
export class ProductsController{

    constructor( 
        private readonly productService : ProductsService
    ){}

    @Get("attrs/")
    async listAttrs(@Res() res:Response, @Query() query:ProductAttrsQueryDTO){
        const attrs = await this.productService.findAllProductAttrs(query)
        res.status(200).json(attrs)
    }

    @Post("attrs/")
    async postAttr(@Res() res:Response, @Req() req, @Body() body:CreateProductAttrsDTO){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }

        const attr = await this.productService.createProductAttrs(body)
        res.status(201).json(attr)
    }

    @Get("attrs/:id")
    async getAttr(@Res() res:Response, product_a_id : string){
        const attr = await this.productService.findOneProductAttr(product_a_id)
        res.status(200).json(attr)
    }

    @Put("attrs/:id")
    async putAttr(@Res() res:Response, @Req() req, @Body() body:CreateProductAttrsDTO, @Param("id") product_a_id){

        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        
        const attr = await this.productService.updateProductAttr(product_a_id, body)
        res.status(201).json(attr)
    }

    @Delete("attrs/:id")
    async deleteAttr(@Res() res:Response, @Req() req, @Param("id") id:string){

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

    @Get("/:id")
    async getProduct(@Res() res:Response, @Param("id") product_id:string){
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

    
    @Put("/:id")
    async putProduct(@Res() res:Response, @Req() req, @Body() body:CreateProductsDTO, @Param("id") product_id){
        
        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        
        const product = await this.productService.updateProduct(product_id, body)
        res.status(201).json(product)
    }

    @Delete("/:id")
    async deleteProduct(@Res() res:Response, @Req() req, @Param("id") product_id:string){
        
        if (!req.user.is_admin){
            throw new UnauthorizedException()
        }
        
        await this.productService.deleteProduct(product_id)
        res.status(201).send(true)
    }

    
}