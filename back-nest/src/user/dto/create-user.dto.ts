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
  paymentMethod?: string;

  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsMongoId()
  role: string;

  @IsOptional()
  @IsString()
  poste?: string;

  @IsOptional()
  @IsString()
  date?: string;


  @IsNotEmpty()
  @IsString()
  @IsIn(['present', 'absent', 'late', 'vacation', 'sick'], {
    message: "Le statut doit être 'present', 'absent', 'late', 'vacation' ou 'sick'"
  })
  status: string;

  @IsNotEmpty()
  @IsMongoId()
  user: string;


  @IsOptional()
  @Type(() => AbonnementDto)
  abonnement?: AbonnementDto;
}