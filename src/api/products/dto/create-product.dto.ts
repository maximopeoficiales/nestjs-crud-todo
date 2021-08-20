import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    @IsNumber()
    salePrice: number;

}
