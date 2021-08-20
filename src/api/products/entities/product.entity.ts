import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 250 })
    description: string;

    @Column({ type: "float" })
    price: number;

    @Column({ type: "float" })
    salePrice: number;

}
