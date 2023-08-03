import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Users } from "../models/users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SigninDTO } from "../dto/auth.dto";
import { PasswordService } from "src/modules/utils/services/password.service";
import { JwtAuthService } from "src/modules/jwt/services/jwt.service";

@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(Users) private readonly UsersRep: Repository<Users>,
        @Inject(PasswordService) private readonly passwordService:PasswordService,
        @Inject(JwtAuthService) private readonly jwtService:JwtAuthService
    ){}


    async authenticateUser(data: SigninDTO) {

        const user = await this.UsersRep.findOne({where: { username: data.username}})

        if (!user){
            throw new NotFoundException("User with this username not found")
        }

        const passwordIsValid = this.passwordService.comparePassword(data.password, user.password)

        if (passwordIsValid){
            return await this.jwtService.generateToken(user)
        } 
        
        throw new UnauthorizedException("Invalid creditinials")
    }
}