import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/schemas/user.schema';


// Typage précis de l'utilisateur pour le token
interface UserPayload {
  _id: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Vérifie les identifiants et retourne un objet sans mot de passe
  async validateUser(email: string, password: string): Promise<UserPayload | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      // Convertir le document Mongoose en objet JS simple
      const { password, ...result } = (user as UserDocument).toObject();
      return result as UserPayload;
    }
    return null;
  }

  //  Génére un token JWT à partir des données utilisateur
  async login(user: UserPayload) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
