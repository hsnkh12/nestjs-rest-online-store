import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateCategoriesDTO{
    @IsString()
    @ApiProperty()
    category_name : string
}