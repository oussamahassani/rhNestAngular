// angular imports
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StagaireService } from 'src/app/services/stagaire.service';

// bootstrap imports
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// third-party imports
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-stagaire-update',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './stagaire-update.component.html',
  styleUrls: ['./stagaire-update.component.scss']
})
export class StagaireUpdateComponent implements OnInit {
  stagaireId: string = '';
  isEditMode = false;

  stagaire = {
    _id: "",
    nom: '',
    prenom: '',
    tel: '',
    adresse: '',
    date: '',
    supervise: '',
    objectif: ''
  
  };

  constructor(
    private stagaireService: StagaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stagaireId = this.route.snapshot.paramMap.get('id')!;

    this.isEditMode = !!this.stagaireId;

    if (this.isEditMode && this.stagaireId) {
      this.stagaireService.getStagaire(this.stagaireId).subscribe({
        next: (response) => {
          this.stagaire = {
            _id: this.stagaireId,
            nom: response.nom,
            prenom: response.prenom,
            tel: response.tel,
            adresse: response.adresse,
             date: response.date,
            supervise: response.supervise,
            objectif: response.objectif

          };
        },
        error: (error) => {
          console.error('Error loading stagaire', error);
          alert('Error loading stagaire data');
        }
      });
    }
  }

  onSubmit(): void {
    const request$ = this.isEditMode && this.stagaireId
      ? this.stagaireService.updateStagaire(this.stagaireId, this.stagaire)
      : this.stagaireService.createStagaire(this.stagaire);

    request$.subscribe({
      next: () => {
        alert(`Stagaire ${this.isEditMode ? 'updated' : 'created'} successfully!`);
        this.router.navigate(['/stagaires']);
      },
      error: (error) => {
        console.error('Error saving stagaire', error);
        alert(`Error ${this.isEditMode ? 'updating' : 'creating'} stagaire. Please try again.`);
      }
    });
  }
}
