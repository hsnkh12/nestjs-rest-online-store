import { BadRequestException, Inject, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductAttributes, Products } from "../models/products.entity";
import { Repository } from "typeorm";
import { CreateProductsDTO, CreateProductAttrsDTO, ProductAttrsQueryDTO, ProductsQueryDTO } from '../dto/products.dto';

@Injectable()
export class ProductsService{

    constructor(    
        @InjectRepository(Products) private readonly ProductsRep : Repository<Products>,
        @InjectRepository(ProductAttributes) private readonly AttrRep: Repository<ProductAttributes>
    ){}

    async findAllProducts(query: ProductsQueryDTO){
        const products = this.ProductsRep.find({where: { category_name: query.category_name }})
        if (query.price){
            return (await products).filter(( p) => {
                if (p.price == query.price){
                    return p
                }
            })
        }

        return products
    }

    async findOneProduct(product_id:string){
        const product = await this.ProductsRep.findOne({where : {product_id: product_id}})

        if (!product){
            throw new NotFoundException()
        }

        return product
    }

    async findAllProductAttrs(query: ProductAttrsQueryDTO){
        const attrs = this.AttrRep.find({where: {product_id: query.product_id}})

        if(query.color){
            return (await attrs).filter( a => {
                if(a.color == query.color){
                    return a
                }
            })
        }

        return attrs
    }

    async findOneProductAttr(product_a_id:string){
        const attr = await this.AttrRep.findOne({where:{product_a_id: product_a_id}})
        
        if(!attr){
            throw new NotFoundException()
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

    async createProductAttrs(data: CreateProductAttrsDTO){
        const attr = await this.AttrRep.create(data)
        return this.AttrRep.save(attr)
    }

    async updateProduct(product_id:string, data:CreateProductsDTO){
        const pr = await this.ProductsRep.preload({ product_id, ...data})

        if (!pr){
            throw new NotFoundException()
        }

        try{

            await this.ProductsRep.save(pr)
            return pr
        } catch(err){
            throw new BadRequestException()
        }

    }

    async updateProductAttr(product_a_id:string, data:CreateProductAttrsDTO){
        const attr = await this.AttrRep.preload({ product_a_id, ...data})

        if (!attr){
            throw new NotFoundException()
        }

        return this.AttrRep.save(attr)
    }

    async deleteProduct(product_id:string){
        const product = await this.findOneProduct(product_id)
        return this.ProductsRep.delete(product)
    }

    async deleteProductAttr(product_a_id:string){
        const attr = await this.findOneProductAttr(product_a_id)
        return this.AttrRep.delete(attr)
    }
}