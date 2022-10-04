const { Entity, Column, PrimaryGeneratedColumn } = require("typeorm");

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    class: string

    @Column()
    manufacturer: string

    @Column()
    country: string

    @Column()
    release_year: number

    @Column()
    price: number
}