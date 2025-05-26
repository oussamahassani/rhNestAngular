import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Stagaire, StagaireDocument } from 'src/schemas/stagaire.schema';
import { CreateStagaireDto } from './dto/create-stagaire.dto';
import { UpdateStagaireDto } from './dto/update-stagaire.dto';

@Injectable()
export class StagaireService {
  constructor(
    @InjectModel(Stagaire.name) private readonly stagaireModel: Model<StagaireDocument>,
  ) {}

  /**
   * Créer un nouveau stagiaire après avoir vérifié l'unicité du numéro de téléphone.
   */
  async create(createStagaireDto: CreateStagaireDto): Promise<Stagaire> {
    const existing = await this.stagaireModel.findOne({ tel: createStagaireDto.tel }).exec();
    if (existing) {
      throw new ConflictException('Un stagiaire avec ce numéro de téléphone existe déjà.');
    }

    const newStagaire = new this.stagaireModel(createStagaireDto);
    return newStagaire.save();
  }

  /**
   * Récupérer tous les stagiaires.
   */
  async findAll(): Promise<Stagaire[]> {
    return this.stagaireModel.find().exec();
  }

  /**
   * Récupérer un stagiaire par son ID Mongo.
   */
  async findOne(id: string): Promise<Stagaire> {
    const stagaire = await this.stagaireModel.findById(id).exec();
    if (!stagaire) {
      throw new NotFoundException(`Stagiaire avec l'ID ${id} introuvable.`);
    }
    return stagaire;
  }

  /**
   * Mettre à jour les informations d'un stagiaire.
   */
  async update(id: string, updateDto: UpdateStagaireDto): Promise<Stagaire> {
    const updated = await this.stagaireModel.findByIdAndUpdate(id, updateDto, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updated) {
      throw new NotFoundException(`Stagiaire avec l'ID ${id} introuvable.`);
    }

    return updated;
  }

  /**
   * Supprimer un stagiaire.
   */
  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.stagaireModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Stagiaire avec l'ID ${id} introuvable.`);
    }

    return { message: 'Stagiaire supprimé avec succès.' };
  }
}
