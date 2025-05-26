import { PartialType } from '@nestjs/mapped-types';
import { CreateStagaireDto } from './create-stagaire.dto';

export class UpdateStagaireDto extends PartialType(CreateStagaireDto) {}
