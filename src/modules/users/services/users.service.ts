import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../models/users.entity";
import { Repository } from "typeorm";
import { CreateUserDTO, UpdateUserDTO } from "../dto/users.dto";
import { Inject } from "@nestjs/common";
import { PasswordService } from "src/modules/utils/services/password.service";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(Users) private readonly UsersRep: Repository<Users>,
        @Inject(PasswordService) private readonly passwordService: PasswordService
    ){}

    async findUsers(){
        return this.UsersRep.find({})
    }

    async findOneUser(user_id : string){
        const user = await this.UsersRep.findOne({where: {user_id: user_id}})

        if (!user){
            throw new NotFoundException("User not found")
        }
        return user
    }

    async createUser(data: CreateUserDTO){

        data.password = await this.passwordService.hashPassword(data.password)
        try{
            const user = this.UsersRep.create({user_id:uuidv4(),...data})
            await this.UsersRep.save(user)
            return user
        }
        catch(err){
            throw new BadRequestException()
        }
    }

    async updateUser(data: UpdateUserDTO, user_id:string, ){
        
        const user = await this.UsersRep.preload({
            user_id: user_id,
            ...data
        })

        if(!user){
            throw new NotFoundException("User not found")
        }

        return this.UsersRep.save(user)
    }

    async deleteUser(user_id:string){
        const user = await this.findOneUser(user_id)
        return this.UsersRep.remove(user)
    }
}