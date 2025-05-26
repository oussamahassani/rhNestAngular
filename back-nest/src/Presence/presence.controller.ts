import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

import { Presence } from 'src/schemas/presence.schema'; 
import { PresenceService } from './presence.service';



@Controller('presences')
export class PresenceController {
  constructor(private readonly presencesService: PresenceService) {}

  @Post()
  create(@Body() createPresenceDto: CreatePresenceDto) {
    console.log('Reçu dans NestJS:', createPresenceDto);
    return this.presencesService.create(createPresenceDto);
  }



  @Get()
  findAll(): Promise<Presence[]> {
    return this.presencesService.findAll();
  }




  @Get(':id')
  findOne(@Param('id') id: string): Promise<Presence> {
    return this.presencesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePresenceDto: UpdatePresenceDto) {
    return this.presencesService.update(id, updatePresenceDto);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.presencesService.delete(id);
  }
}
