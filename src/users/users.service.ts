import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto-interface/user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(infoUser:UserDto){
        const findUser = await this.userRepository.findOne({
            where:{
                username:infoUser.username
            }
        });
        if(findUser){
            return new HttpException("El usuario que esta intentado crear, ya existe en nuestro sistema", HttpStatus.OK);
        }
        const newUser = this.userRepository.create(infoUser);
        return await this.userRepository.save(newUser);
    }

    getAllUser(){
        return this.userRepository.find();
    }

    async getOneUser(id:number){
        const findUser = await this.userRepository.findOne({
            where:{
                id:id
            }
        });
        if(findUser){
            return new HttpException("El usuario no existe en nuestro sistema", HttpStatus.OK);
        }
        return findUser;
    }

    async updateUser(id:number, infoUser:UserDto){
        const findUser = await this.getOneUser(id);
        if(!findUser){
            return new HttpException("Usuario no existe, no se puede actualizar la información", HttpStatus.OK);
        }

        const updateUser = await this.userRepository.update({id}, infoUser);
        if(updateUser){
            return true;
        }
    }

    async deleteUser(id:number){
        const findUser = await this.getOneUser(id);
        if(!findUser){
            return new HttpException("Usuario no existe, no se puede eliminar la información", HttpStatus.OK);
        }
        const deleteUser = await this.userRepository.delete({id});
        if(deleteUser){
            return true;
        }
    }
}
