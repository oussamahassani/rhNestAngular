import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(['accepté', 'refusé'])
  status: 'accepté' | 'refusé';
}