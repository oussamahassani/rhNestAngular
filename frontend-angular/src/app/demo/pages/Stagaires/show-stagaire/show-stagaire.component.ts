import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StagaireService } from 'src/app/services/stagaire.service';
import { Stagaire } from 'src/app/models/stagaire.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
//show-stagaire
@Component({
  selector: 'app-show-stagaire',
  standalone: true,
  imports: [SharedModule, CommonModule, HttpClientModule],
  templateUrl: './show-stagaire.component.html',
  styleUrls: ['./show-stagaire.component.scss']
})
export default class ShowStagaireComponent implements OnInit {
  stagaires: Stagaire[] = [];
  loading = false;

  constructor(
    private stagaireService: StagaireService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStagaires();
  }
  editStagaire(stagaireId: string): void {
    if (stagaireId === undefined) {
      console.error('Stagaire ID is undefined');
      return;
    }
    this.router.navigate(['/stagaires/edit', stagaireId]);
  }
  loadStagaires(): void {
    this.loading = true;
    this.spinner.show();

    this.stagaireService.getAllStagaires().subscribe({
      next: (stagaires) => {
        this.stagaires = stagaires;
        this.loading = false;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error loading stagaires:', error);
        this.toastr.error('Failed to load stagaires', 'Error');
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  deleteStagaire(id: string): void {
    if (confirm('Are you sure you want to delete this stagaire?')) {
      this.stagaireService.deleteStagaire(id).subscribe({
        next: () => {
          this.toastr.success('Stagaire deleted successfully', 'Success');
          this.loadStagaires(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting stagaire:', error);
          this.toastr.error('Failed to delete stagaire', 'Error');
        }
      });
    }
  }
}
