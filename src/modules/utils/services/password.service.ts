import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;


@Injectable()
export class PasswordService{


    async hashPassword(password: string){
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePassword(password:string, hashed_password:string){
        return await bcrypt.compare(password, hashed_password);
    }
}