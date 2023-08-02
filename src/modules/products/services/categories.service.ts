import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Categories } from '../models/categories.entity';
import { InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoriesDTO } from "../dto/categories.dto";


@Injectable()
export class CategoriesService{

    constructor(    
        @InjectRepository(Categories) private readonly categoriesRep : Repository<Categories>
    ){}

    async createCategory(data: CreateCategoriesDTO){

        try{
            const category = this.categoriesRep.create(data)
            await this.categoriesRep.save(category)
            return category
        }
        catch(err){
            throw new BadRequestException()
        }
    }

    async updateCategory(categoty_name : string, data: CreateCategoriesDTO){
        const category = await this.categoriesRep.preload({ 
            category_name: categoty_name, 
            ...data
        })

        if (!category){
            throw new NotFoundException()
        }

        try{
            await this.categoriesRep.save(category)
            return category
        } catch(err){
            throw new BadRequestException()
        }
        
    }

    async findOneCategory(category_name:string){
        const category = await this.categoriesRep.findOne({ where: {category_name: category_name}})

        if(! category){
            throw new NotFoundException()
        }
        return category
    }

    async findAllCategories(){
        return await this.categoriesRep.find({})
    }

    async deleteCategory(category_name : string){
        const category = await this.findOneCategory(category_name)
        return await this.categoriesRep.delete(category)
    }
}