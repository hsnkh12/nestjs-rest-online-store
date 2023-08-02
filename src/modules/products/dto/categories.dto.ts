import { IsString } from "class-validator";


export class CreateCategoriesDTO{
    @IsString()
    category_name : string
}