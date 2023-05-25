import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity({name: 'properties'})
export class Propertie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    textProperties: string

    @Column()
    price: string

    @Column()
    details: string

    @Column()
    urlimage: string
    
    @Column('simple-json', {nullable: true})
    viewProperties: {
        img: string
      };

}