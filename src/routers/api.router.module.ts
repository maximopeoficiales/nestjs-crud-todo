import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ProductsModule } from "src/api/products/products.module";
import { TodoModule } from "src/api/todo/todo.module";
import { AuthModule } from "src/auth/auth.module";

const routes: Routes = [
    {
        path: '/api',
        children: [
            {
                path: '/auth',
                module: AuthModule,
            },
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
        ), AuthModule, TodoModule, ProductsModule], // as usual, nothing new
})
export class RouterApiModule { }