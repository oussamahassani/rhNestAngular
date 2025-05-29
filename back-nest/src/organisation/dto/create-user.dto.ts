import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  IsMongoId, 
  IsOptional, 
  IsBoolean, 
  IsDateString, 
  IsIn 
} from 'class-validator';
import { Type } from 'class-transformer';

export class AbonnementDto {
  @IsOptional()
  @IsString()
  @IsIn(['free', 'basic', 'premium', 'enterprise'])
  planType?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  nameorg?: string;

}

