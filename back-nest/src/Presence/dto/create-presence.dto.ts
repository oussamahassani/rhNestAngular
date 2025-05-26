import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { IsIn } from 'class-validator';
export class CreatePresenceDto {

  @IsNotEmpty()
  @IsString()
  code: string;


  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  heureArrive: string;

  @IsOptional()
  @IsString()
  heureDepart?: string;

 @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsMongoId()
  user: string;
}

