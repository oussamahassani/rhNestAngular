import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema'; 
import {decryptData} from '../utilsDecript'


@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}


  @Post("/create")
  SignupUser(@Body('payload') payload: string) {
      const data = decryptData(payload, 'MA_CLE_SECRETE');

    return this.organisationService.SignupUser(data);
  }
  @Get()
  findAll(): Promise<User[]> {
    return this.organisationService.findAll(); // Appelle la méthode du service
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organisationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.organisationService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.organisationService.delete(id);
  }
}
