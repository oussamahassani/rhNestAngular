import { PartialType } from '@nestjs/mapped-types';
import { AbonnementDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(AbonnementDto) {}
