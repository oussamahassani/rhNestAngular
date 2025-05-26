// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingUpUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
