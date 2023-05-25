import { Body, Controller, Get, ParseIntPipe, Post, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto-interface/user.dto';

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService){}

    @Post()
    createUser(@Body() newUser:UserDto){
        return this.UsersService.createUser(newUser);
    }

    @Get()
    getAllUsers(){
        return this.UsersService.getAllUser();
    }

    @Get(':id')
    getOneUser(@Param('id', ParseIntPipe) id:number){
        return this.UsersService.getOneUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id:number, @Body() infoUser:UserDto){
        return this.UsersService.updateUser(id, infoUser);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id:number){
        return this.UsersService.deleteUser(id);
    }
    
}
