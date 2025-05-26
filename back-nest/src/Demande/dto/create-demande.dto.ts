import {  IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { IsIn } from 'class-validator';
export class CreateDemandeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  poste: string;

  @IsIn(['accepté', 'refusé'])
  status: 'accepté' | 'refusé';
  


}

