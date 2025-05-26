import {  IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;


}

