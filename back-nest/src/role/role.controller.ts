import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/schemas/role.schema'; 


@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll(); // Appelle la méthode du service
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id); // Ajoute une méthode `findOne` dans le service pour récupérer par ID
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }
}
