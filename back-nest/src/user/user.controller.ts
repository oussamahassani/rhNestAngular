import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema'; 
import { SingUpUserDto } from './dto/Singup-dto';


@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
@Post('reset-password')
async resetPassword(@Body('email') email: string) {
  return this.usersService.resetPassword(email);
}
  @Post("/signup")
  SignupUser(@Body() createUserDto: SingUpUserDto) {
    return this.usersService.SignupUser(createUserDto);
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
