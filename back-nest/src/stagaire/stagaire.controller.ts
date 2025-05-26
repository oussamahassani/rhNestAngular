import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StagaireService } from './stagaire.service';
import { CreateStagaireDto } from './dto/create-stagaire.dto';
import { UpdateStagaireDto } from './dto/update-stagaire.dto';
import { Stagaire } from 'src/schemas/stagaire.schema'; 


@Controller('stagaires')
export class StagaireController {
  constructor(private readonly stagairesService: StagaireService) {}

  @Post()
  create(@Body() createStagaireDto: CreateStagaireDto) {
    return this.stagairesService.create(createStagaireDto);
  }

  @Get()
  findAll(): Promise<Stagaire[]> {
    return this.stagairesService.findAll(); // Appelle la méthode du service
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Stagaire> {
    return this.stagairesService.findOne(id); // Ajoute une méthode `findOne` dans le service pour récupérer par ID
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStagaireDto: UpdateStagaireDto) {
    return this.stagairesService.update(id, updateStagaireDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.stagairesService.delete(id);
  }
}
