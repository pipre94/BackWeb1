import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Propertie } from './properties.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-properties.dto';

@Injectable()
export class PropertiesService {

    constructor(@InjectRepository(Propertie) private propertieRepository: Repository<Propertie>){}

    async createPropertie(properties: CreateUserDto){
        const newProp = this.propertieRepository.create(properties);
        return await this.propertieRepository.save(newProp);
    }

    getAllProperties(){
        return this.propertieRepository.find();
    }

    async getOneProperties(id:number){
        const findProperties = await this.propertieRepository.findOne({
            where:{
                id:id
            }
        });
        if(findProperties){
            return new HttpException("Propiedad no existe, no se puede actualizar, por favor verifica la información", HttpStatus.OK);
        }
        return findProperties;
    }

    async updateProperties(id:number, properties:CreateUserDto ){

        const findProperties = await this.getOneProperties(id);
        if(findProperties){
            return new HttpException("Propiedad no existe, no se puede actualizar, por favor verifica la información", HttpStatus.OK);
        }
        const updateProperties = this.propertieRepository.update({id},properties);

        if(updateProperties){
            return true;
        }
    }

    async deleteProperties(id:number){
        const findProperties = await this.getOneProperties(id);
        if(!findProperties){
            return new HttpException("Propiedad no existe, no se puede eliminar, por favor verifica la información", HttpStatus.OK);
        }
       const deleteProperties = this.propertieRepository.delete({id});

       if(deleteProperties){
        return true;
       }
    }
}
