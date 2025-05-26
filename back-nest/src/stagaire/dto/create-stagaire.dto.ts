import {  IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateStagaireDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

 @IsNotEmpty()
  @IsString()
  adresse: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  supervise: string;

 @IsNotEmpty()
 @IsString()
 objectif: string;


}

