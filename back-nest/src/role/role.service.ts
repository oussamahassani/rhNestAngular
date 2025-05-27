import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role, RoleDocument } from 'src/schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    private readonly logger = new Logger(RoleService.name);

  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleModel.findOne({ name: createRoleDto.name });
    if (existingRole) {
         this.logger.error("Role with this name already exists" +createRoleDto.name  );
      throw new ConflictException('Role with this name already exists');
   
      
    }
this.logger.log(createRoleDto);
    const newRole = new this.roleModel(createRoleDto);

    return newRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      this.logger.error("Role with ID " +id + "not found" );

      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const updatedRole = await this.roleModel.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
      runValidators: true,
    });

    if (!updatedRole) {
         this.logger.error(`Role with ID ${id} not found` );
      throw new NotFoundException(`Role with ID ${id} not found`);
    

    }

    return updatedRole;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedRole = await this.roleModel.findByIdAndDelete(id);
    if (!deletedRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return { message: 'Role deleted successfully' };
  }
}
