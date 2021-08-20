import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Forma con aecoradores 
export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);