const { Entity, Column, PrimaryGeneratedColumn } = require("typeorm");

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    class: string

    @Column()
    manufacturer: string

    @Column()
    country: string

    @Column({type: "year"})
    release_year: string

    @Column()
    price: string

}