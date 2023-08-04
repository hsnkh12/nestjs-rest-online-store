import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductSpecs, Products } from "../models/products.entity";
import { DeepPartial, Repository } from "typeorm";
import { CreateProductsDTO, CreateProductSpecDTO, ProductSpecQueryDTO, ProductsQueryDTO } from '../dto/products.dto';
import { Categories } from '../models/categories.entity';

@Injectable()
export class ProductsService{

    constructor(    
        @InjectRepository(Products) private readonly ProductsRep : Repository<Products>,
        @InjectRepository(ProductSpecs) private readonly SpecRep: Repository<ProductSpecs>
    ){}

    async findAllProducts(query: ProductsQueryDTO){

        const category : DeepPartial<Categories> = {
            category_name: query.category_name
        }

        const products = this.ProductsRep.find({where: { category: category }})

        return products
    }

    async findOneProduct(product_id:number){
        const product = await this.ProductsRep.findOne({where : {product_id: product_id}})

        if (!product){
            throw new NotFoundException("Product not found")
        }

        return product
    }

    async findAllProductAttrs(query: ProductSpecQueryDTO){
        const product : DeepPartial<Products> = {
            name : query.product_name
        }
        const attrs = this.SpecRep.find({where: {product: product}})
        return attrs
    }

    async findOneProductAttr(product_a_id:string){
        const attr = await this.SpecRep.findOne({where:{product_a_id: product_a_id}})
        
        if(!attr){
            throw new NotFoundException("Product specification not found")
        }

        return attr
    }

    async createProduct(data:CreateProductsDTO){

        try{
            const pr = this.ProductsRep.create(data)
            await this.ProductsRep.save(pr)
            return pr
        } catch (err){
            throw new BadRequestException()
        }
    }

    async createProductAttrs(data: CreateProductSpecDTO){
        const attr = await this.SpecRep.create(data)
        return this.SpecRep.save(attr)
    }

    async updateProduct(product_id:number, data:CreateProductsDTO){
        const pr = await this.ProductsRep.preload({ product_id, ...data})

        if (!pr){
            throw new NotFoundException("Product not found")
        }

        try{

            await this.ProductsRep.save(pr)
            return pr
        } catch(err){
            throw new BadRequestException()
        }

    }

    async updateProductAttr(product_a_id:string, data:CreateProductSpecDTO){
        const attr = await this.SpecRep.preload({ product_a_id, ...data})

        if (!attr){
            throw new NotFoundException("Product specification not found")
        }

        return this.SpecRep.save(attr)
    }

    async deleteProduct(product_id:number){
        const product = await this.findOneProduct(product_id)
        return this.ProductsRep.delete(product)
    }

    async deleteProductAttr(product_a_id:string){
        const attr = await this.findOneProductAttr(product_a_id)
        return this.SpecRep.delete(attr)
    }
}