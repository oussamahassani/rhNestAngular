// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingUpUserDto {
  @IsNotEmpty()
  nameorg: string;

  @IsEmail()
  email: string;


}
