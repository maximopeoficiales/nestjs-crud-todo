import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ProductsModule } from "src/api/products/products.module";
import { TodoModule } from "src/api/todo/todo.module";
import { TodoPagesModule } from "src/pages/todo-pages/todo-pages.module";

const routes: Routes = [
    {
        path: '/',
        children: [
            {
                path: '/todos',
                module: TodoPagesModule,
            }
        ],
    },
];

@Module({
    imports: [
        RouterModule.register(
            routes
        ), TodoPagesModule], // as usual, nothing new
})
export class RouterPagesModule { }