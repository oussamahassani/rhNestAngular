import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DemandeService } from 'src/app/services/demande.service';
import { Demande } from 'src/app/models/demande.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-demande',
  standalone: true,
  imports: [SharedModule, CommonModule, HttpClientModule],
  templateUrl: './show-demande.component.html',
  styleUrls: ['./show-demande.component.scss']
})
export default class ShowDemandeComponent implements OnInit {
  demandes: Demande[] = [];
  loading = false;
  loadingStatusId: string | null = null;

  constructor(
    private demandeService: DemandeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.loading = true;
    this.spinner.show();

    this.demandeService.getAllDemandes().subscribe({
      next: (demandes) => {
        this.demandes = demandes;
        this.loading = false;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error loading demandes:', error);
        this.toastr.error('Failed to load demandes', 'Error');
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  onStatusChange(demande: Demande) {
    const nouveauStatut = demande.status;
    if (
      nouveauStatut === 'en attente' ||
      nouveauStatut === 'accepté' ||
      nouveauStatut === 'refusé'
    ) {
      this.changerStatus(demande._id, nouveauStatut);
    } else {
      console.warn('Statut invalide:', nouveauStatut);
    }
  }
  changerStatus(demandeId: string, nouveauStatut: 'en attente' | 'accepté' | 'refusé') {
    this.loadingStatusId = demandeId;
  
    this.demandeService.updateStatus(demandeId, nouveauStatut).subscribe({
      next: (updatedDemande) => {
        const index = this.demandes.findIndex(d => d._id === demandeId);
        if (index !== -1) {
          this.demandes[index] = updatedDemande;
        }
        this.toastr.success('Statut mis à jour avec succès');
        this.loadingStatusId = null;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors de la mise à jour du statut');
        this.loadingStatusId = null;
      }
    });
  }
  
  

  editDemande(demandeId: string): void {
    if (demandeId === undefined) {
      console.error('Demande ID is undefined');
      return;
    }
    this.router.navigate(['/demandes/edit', demandeId]);
  }

  deleteDemande(id: string): void {
    if (confirm('Are you sure you want to delete this demande?')) {
      this.demandeService.deleteDemande(id).subscribe({
        next: () => {
          this.toastr.success('Demande supprimée avec succès');
          this.loadDemandes();
        },
        error: (error) => {
          console.error('Erreur suppression demande:', error);
          this.toastr.error('Échec de la suppression de la demande');
        }
      });
    }
  }
}
