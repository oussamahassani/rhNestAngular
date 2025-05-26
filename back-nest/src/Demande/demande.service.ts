import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Demande, DemandeDocument } from 'src/schemas/demande.schema';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';

@Injectable()
export class DemandeService {
  constructor(
    @InjectModel(Demande.name) private readonly demandeModel: Model<DemandeDocument>,
  ) {}

  /**
   * Créer un nouveau stagiaire après avoir vérifié l'unicité du numéro de téléphone.
   */
  async create(createDemandeDto: CreateDemandeDto): Promise<Demande> {
    const existing = await this.demandeModel.findOne({ code: createDemandeDto.code }).exec();
    if (existing) {
      throw new ConflictException('Un stagiaire avec ce numéro de code existe déjà.');
    }

    const newDemande = new this.demandeModel(createDemandeDto);
    return newDemande.save();
  }

  /**
   * Récupérer tous les Demandes.
   */
  async findAll(): Promise<Demande[]> {
    return this.demandeModel.find().exec();
  }

//updateStatus

  async updateStatus(id: string, status: 'accepté' | 'refusé') {
    return this.demandeModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }

  /**
   * Récupérer un Demande par son ID Mongo.
   */
  async findOne(id: string): Promise<Demande> {
    const demande = await this.demandeModel.findById(id).exec();
    if (!demande) {
      throw new NotFoundException(`Demande avec l'ID ${id} introuvable.`);
    }
    return demande;
  }

  /**
   * Mettre à jour les informations d'un Demande.
   */
  async update(id: string, updateDto: UpdateDemandeDto): Promise<Demande> {
    const updated = await this.demandeModel.findByIdAndUpdate(id, updateDto, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updated) {
      throw new NotFoundException(`Demande avec l'ID ${id} introuvable.`);
    }

    return updated;
  }

  /**
   * Supprimer un Demande
   */
  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.demandeModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Demande avec l'ID ${id} introuvable.`);
    }

    return { message: 'Demande supprimé avec succès.' };
  }
}
