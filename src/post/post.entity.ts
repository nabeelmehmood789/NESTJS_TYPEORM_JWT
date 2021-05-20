import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: "posts"})
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    title:string;

    @Column()
    description:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}