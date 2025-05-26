// Angular imports
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StagaireService } from 'src/app/services/stagaire.service';
import { Stagaire } from 'src/app/models/stagaire.model';

// Bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Third-party import
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-add-stagaire',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './add-stagaire.component.html',
  styleUrls: ['./add-stagaire.component.scss']
})
export default class AddStagaireComponent {
  stagaire: Stagaire = {
    _id: '',
    nom: '',
    prenom: '',
    tel: '',
    adresse: '',
    date: '',
    supervise: '',
    objectif: ''
  };

  constructor(private stagaireService: StagaireService) {}

  onSubmit(): void {
    const newStagaire: Omit<Stagaire, '_id'> = {
      nom: this.stagaire.nom,
      prenom: this.stagaire.prenom,
      tel: this.stagaire.tel,
      adresse: this.stagaire.adresse,
      date: this.stagaire.date,
      supervise: this.stagaire.supervise,
      objectif: this.stagaire.objectif
    };

    this.stagaireService.createStagaire(newStagaire).subscribe({
      next: (response) => {
        console.log('Stagaire created successfully:', response);
        alert('Stagaire created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating stagaire:', error);
        alert('Error creating stagaire. Please try again.');
      }
    });
  }

  private resetForm(): void {
    this.stagaire = {
      _id: '',
      nom: this.stagaire.nom,
      prenom: this.stagaire.prenom,
      tel: this.stagaire.tel,
      adresse: this.stagaire.adresse,
     date: this.stagaire.date,
      supervise: this.stagaire.supervise,
      objectif: this.stagaire.objectif
    };
  }
}
