import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Addresses } from "../models/address.entity";
import { DeepPartial, Repository } from "typeorm";
import { AddressDTO } from '../dto/address.dto';
import { Users } from "src/modules/users/models/users.entity";


@Injectable()
export class AddressService{

    constructor( @InjectRepository(Addresses) private readonly AddressRep : Repository<Addresses>){}



    async findOneAddress(address_title: string){
        const address = await this.AddressRep.findOne({where : { address_title: address_title}})

        if (!address){
            throw new NotFoundException("Address not found")
        }

        return address
    }

    async createAddress(data: AddressDTO, user_id : string){

        const user : DeepPartial<Users> = {
            user_id : user_id
        }
        
        const address = this.AddressRep.create(data)
        return this.AddressRep.save({...address, user})
    }

    async updateAddress(data: AddressDTO, address_title: string, user_id:string){

        const user : DeepPartial<Users> = {
            user_id : user_id
        }
        
        const address = await this.AddressRep.preload({
            address_title,
            user
        })

        if(!address){
            throw new NotFoundException("Address not found")
        }

        return this.AddressRep.save({...address, ...data})
    }

    async deleteAddress(address_title : string){
        const address = await this.findOneAddress(address_title)
        return this.AddressRep.delete(address)
    }
}