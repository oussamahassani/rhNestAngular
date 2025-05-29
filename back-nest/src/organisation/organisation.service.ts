import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AbonnementDto } from './dto/create-user.dto';
import { SingUpUserDto } from './dto/Singup-dto';
import {UserService} from '../user/user.service'
import { UpdateUserDto } from './dto/update-user.dto';
import { Organisation, OrganisationDocument } from 'src/schemas/organisation.shema';
import { MailerService } from '../mailer/mailer.service'; // ajuster le chemin
import {decryptData} from '../utilsDecript'
@Injectable()
export class OrganisationService {
      private readonly logger = new Logger(OrganisationService.name);
  
  constructor(
    @InjectModel(Organisation.name) private readonly orgModel: Model<OrganisationDocument>,
    
        private readonly mailerService: MailerService,
        private readonly userService:UserService,

  ) { }
  //  Créer un nouvel utilisateur
    async SignupUser(createUserDto: SingUpUserDto): Promise<Boolean> {
      this.logger.log(createUserDto)
 

   
    const org= new this.orgModel({...createUserDto,

    });
     org.save();
         await this.userService.createuser({...createUserDto ,...org });

     return true ;

    }




  //  Récupérer tous les utilisateurs
  async findAll(): Promise<any[]> {
    return this.orgModel.find().lean().exec();
  }



  // Trouver un utilisateur par email (utile pour login)
  async findByEmail(email: string): Promise<any | null> {
    return this.orgModel.findOne({ email }).exec();
  }

  //  Trouver un utilisateur par ID
  async findOne(id: string): Promise<any> {
    const user = await this.orgModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;

  }


  //  Mettre à jour un utilisateur (avec rehash du mot de passe si modifié)
  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
  

    const updatedUser = await this.orgModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }


  //  Supprimer un utilisateur
  async delete(id: string): Promise<any> {
    const deletedUser = await this.orgModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
