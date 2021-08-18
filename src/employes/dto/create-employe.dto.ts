import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeDto {
    name: string;
    ocupation: string;
    age: number;
}
