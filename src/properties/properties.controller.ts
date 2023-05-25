import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-properties.dto';
import { PropertiesService } from './properties.service';
import { Propertie } from './properties.entity';

@Controller('properties')
export class PropertiesController {

    constructor(private propertiesServices: PropertiesService){}

    @Post()
    createProperties(@Body() newProp:CreateUserDto){
        return this.propertiesServices.createPropertie(newProp);
    }

    @Get()
    getAllProperties() : Promise<Propertie[]>{
        return this.propertiesServices.getAllProperties();
    }

    @Get(':id')
    getOneProperties(@Param('id', ParseIntPipe) id:number){
        return this.propertiesServices.getOneProperties(id);
    }

    @Patch(':id')
    updateProperties(@Param('id', ParseIntPipe) id:number, @Body() propertie: CreateUserDto){
        return this.propertiesServices.updateProperties(id, propertie );
    }

    @Delete(':id')
    deleteProperties(@Param('id', ParseIntPipe) id:number){
        return this.propertiesServices.deleteProperties(id);

    }
}
