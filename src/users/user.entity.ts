import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:'10', unique: true})
    username : string;

    @Column({length:'10'})
    password : string;

    @Column({length:'10'})
    name : string;

    @Column({length:'10'})
    mail: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createDate : Date;

}