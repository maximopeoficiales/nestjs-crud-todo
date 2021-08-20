import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ProductsModule } from "src/api/products/products.module";
import { TodoModule } from "src/api/todo/todo.module";

const routes: Routes = [
    {
        path: '/api',
        children: [
            {
                path: '/todos',
                module: TodoModule,
            },
            {
                path: '/products',
                module: ProductsModule,
            },
        ],
    },
];

@Module({
    imports: [
        RouterModule.register(
            routes
        ), TodoModule, ProductsModule], // as usual, nothing new
})
export class RouterApiModule { }