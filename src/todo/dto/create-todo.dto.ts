import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {

    @ApiProperty({
        description: 'Title of todo',
        type: () => String,
        minLength: 10,
        required: true,
    })
    title: string;

    // @ApiProperty({
    //     description: 'Description of todo',
    //     type: () => String,
    //     minLength: 100,
    //     required: true,
    // })
    description: string;
}
