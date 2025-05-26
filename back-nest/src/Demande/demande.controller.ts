import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';

import { Demande } from 'src/schemas/demande.schema'; 
import { DemandeService } from './demande.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('demandes')
export class DemandeController {
  constructor(private readonly demandesService: DemandeService) {}

  @Post()
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandesService.create(createDemandeDto);
  }

  @Get()
  findAll(): Promise<Demande[]> {
    return this.demandesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Demande> {
    return this.demandesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDemandeDto: UpdateDemandeDto) {
    return this.demandesService.update(id, updateDemandeDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return this.demandesService.updateStatus(id, updateStatusDto.status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.demandesService.delete(id);
  }
}
