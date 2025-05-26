import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemandeService } from 'src/app/services/demande.service';
import { Router } from '@angular/router';
import { Demande,NewDemande } from 'src/app/models/demande.model';


@Component({
  selector: 'app-create-demande',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-demande.component.html'
})
export class CreateDemandeComponent {
  newDemande: NewDemande = {
    code: '',
    nom: '',
    poste: '',
    status: 'en attente' // ✅ Valeur par défaut
  };

  constructor(
    private demandeService: DemandeService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.demandeService.createDemande(this.newDemande).subscribe({
      next: () => {
        alert('Demande créée avec succès');
        this.router.navigate(['/demandes']);
      },
      error: (err) => {
        console.error('Erreur création demande :', err);
        alert('Erreur lors de la création');
      }
    });
  }
}
