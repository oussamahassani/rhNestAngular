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

import { CreateUserDto } from './dto/create-user.dto';
import { SingUpUserDto } from './dto/Singup-dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Role, RoleDocument } from 'src/schemas/role.schema';
import { MailerService } from '../mailer/mailer.service'; // ajuster le chemin
import {decryptData} from '../utilsDecript'
@Injectable()
export class UserService {
      private readonly logger = new Logger(UserService.name);
  
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
        private readonly mailerService: MailerService,

  ) { }
  //  Créer un nouvel utilisateur
    async SignupUser(createUserDto: SingUpUserDto): Promise<Boolean> {
      this.logger.log(createUserDto)
          const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
   const existingRole = await this.roleModel.findOne({ name: "employee"})
   if(existingRole){
          this.logger.log(existingRole._id)

   
    const createdUser = new this.userModel({...createUserDto,password:hashedPassword,
              planType: 'free',
              role:existingRole._id,
        startDate: new Date(),
        isActive: true,
        paymentMethod: 'none',
        autoRenew: false
    });
     createdUser.save();
     return true ;
   }
   return false ;
    }

    async createuser(data :any){
        const hashedPassword = await bcrypt.hash(data.password, 10);
   const existingRole = await this.roleModel.findOne({ name: "admin"})
   if(existingRole){
          this.logger.log(existingRole._id)

   
    const createdUser = new this.userModel({...data,password:hashedPassword,
              
              role:existingRole._id,
        startDate: new Date(),
        isActive: true,
        paymentMethod: 'none',
        autoRenew: false
    });
     createdUser.save();
     return true ;
   }
   return false ;
    }
    

      async resetPassword(email: string): Promise<any> {
    // 1. Vérifie que l’utilisateur existe
    const data = decryptData(email, process.env.mySecret||"MA_CLE_SECRETE");
    const user = await this.userModel.findOne({email:data});
    if (!user) {
           this.logger.error('Utilisateur non trouvé')
      throw new Error('Utilisateur non trouvé');
    }

    // 2. Génère un nouveau mot de passe aléatoire
    const newPassword = Math.random().toString(36).slice(-8); // Exemple simple

    // 3. Hash le mot de passe et enregistre-le
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
user.password = hashedPassword ; 
    await user.save(); // ou repository.save(user)

    // 4. Envoie l’e-mail avec le nouveau mot de passe
    await this.mailerService.sendForgetPasswordEmail(user.email, newPassword);

    return { message: 'Un nouveau mot de passe a été envoyé par e-mail' };
  }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
       this.logger.error('Email already in use'+createUserDto.email )
      throw new ConflictException('Email already in use');
    }

    const role = await this.roleModel.findById(createUserDto.role);
    if (!role) {
             this.logger.error('Role not found'+createUserDto.role )

      throw new NotFoundException('Role not found');
    }

    const roleName = role.name?.toLowerCase();

    if (roleName === 'employee') {
      if (!createUserDto.poste || !createUserDto.date) {
                     this.logger.error('Poste and date are required for employees' )

        throw new BadRequestException('Poste and date are required for employees');
      }
    } else {
      createUserDto.poste = undefined;
      createUserDto.date = undefined;
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      abonnement: createUserDto.abonnement || {
        planType: 'free',
        startDate: new Date(),
        isActive: true,
        paymentMethod: 'none',
        autoRenew: false
      }
    });

    await createdUser.save();
    return this.userModel.findById(createdUser._id);
  }

  //  Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('role').lean().exec();
  }



  // Trouver un utilisateur par email (utile pour login)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  //  Trouver un utilisateur par ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('role');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;

  }


  //  Mettre à jour un utilisateur (avec rehash du mot de passe si modifié)
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const role = await this.roleModel.findById(updateUserDto.role);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Si le rôle est 'employee', vérifier poste et date
    if (role.name.toLowerCase() === 'employee') {
      if (!updateUserDto.poste || !updateUserDto.date) {
        throw new BadRequestException('Poste and date are required for employees');
      }
    } else {
      // Si ce n'est pas un employé, on supprime ces champs pour éviter de les enregistrer
      updateUserDto.poste = undefined;
      updateUserDto.date = undefined;
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }


  //  Supprimer un utilisateur
  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
