import { Controller } from "@nestjs/common";
import { Get, Post, Put, Delete, Req, Res, Param, Body } from "@nestjs/common";
import { AddressService } from '../services/address.service';
import { AddressDTO } from "../dto/address.dto";
import { ApiBearerAuth } from "@nestjs/swagger";



@Controller("address")
@ApiBearerAuth()
export class AddressController{

    constructor(private readonly addressService: AddressService){}


    @Get("/")
    async get(@Req() req, @Res() res ,@Param("title") address_title : string ){
        const address = await this.addressService.findOneAddress(address_title)
        res.status(200).json(address)
    }

    @Post("/")
    async post(@Req() req, @Res() res, @Body() body: AddressDTO){
        const address = await this.addressService.createAddress(body, req.user.user_id)
        res.status(201).json(address)
    }

    @Put("/:title")
    async put(@Req() req, @Res() res, @Body() body:AddressDTO, @Param("title") address_title:string){
        const address = await this.addressService.updateAddress(body, address_title, req.user.user_id)
        res.status(201).json(address)

    }

    @Delete("/:title")
    async delete(@Req() req, @Res() res, @Param("title") address_title:string){
        await this.addressService.deleteAddress(address_title)
        res.status(201).send(true)
    }
}
