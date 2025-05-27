import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema'; 
import { SingUpUserDto } from './dto/Singup-dto';
import {decryptData} from '../utilsDecript'


@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create( @Body('payload') payload: string) {
      const data = decryptData(payload, 'MA_CLE_SECRETE');
    return this.usersService.create(data);
  }
@Post('reset-password')
async resetPassword(@Body('email') email: string) {
  return this.usersService.resetPassword(email);
}
  @Post("/signup")
  SignupUser(@Body('payload') payload: string) {
      const data = decryptData(payload, 'MA_CLE_SECRETE');

    return this.usersService.SignupUser(data);
  }
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll(); // Appelle la méthode du service
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
