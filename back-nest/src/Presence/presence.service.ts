import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Presence, PresenceDocument } from 'src/schemas/presence.schema';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

@Injectable()
export class PresenceService {
  constructor(
    @InjectModel(Presence.name) private readonly presenceModel: Model<PresenceDocument>,
  ) {}

  /**
   * Créer un nouveau Presence après avoir vérifié l'unicité du numéro de téléphone.
   */
  async create(createPresenceDto: CreatePresenceDto): Promise<Presence> {
    const existing = await this.presenceModel.findOne({ code: createPresenceDto.code }).exec();
    if (existing) {
      throw new ConflictException('Un Presence avec ce numéro de code existe déjà.');
    }

    const newPresence = new this.presenceModel(createPresenceDto);
    return newPresence.save();
  }

  /**
   * Récupérer tous les Presence.
   */
/*   async findAll(): Promise<Presence[]> {
    return this.presenceModel.find().exec();
  } */

  async findAll(): Promise<Presence[]> {
  return this.presenceModel.find().populate('user');
}

  /**
   * Récupérer un Presence par son ID Mongo.
   */
  async findOne(id: string): Promise<Presence> {
    const presence = await this.presenceModel.findById(id).exec();
    if (!presence) {
      throw new NotFoundException(`Presence avec l'ID ${id} introuvable.`);
    }
    return presence;
  }

  /**
   * Mettre à jour les informations d'un Presence.
   */
  async update(id: string, updateDto: UpdatePresenceDto): Promise<Presence> {
    const updated = await this.presenceModel.findByIdAndUpdate(id, updateDto, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updated) {
      throw new NotFoundException(`Presence avec l'ID ${id} introuvable.`);
    }

    return updated;
  }

  /**
   * Supprimer un Presence.
   */
  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.presenceModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Presence avec l'ID ${id} introuvable.`);
    }

    return { message: 'Presence supprimé avec succès.' };
  }
}
