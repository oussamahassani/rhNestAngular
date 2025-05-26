// angular imports
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';


// bootstrap imports
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// third-party imports
import { ColorPickerModule } from 'ngx-color-picker';
import { PresenceService } from 'src/app/services/presence.service';

@Component({
  selector: 'app-presence-update',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './presence-update.component.html',
  styleUrls: ['./presence-update.component.scss']
})
export class PresenceUpdateComponent implements OnInit {
  presenceId: string = '';
  isEditMode = false;

  presence = {
    _id: "",
    date: '',
    heureArrive: '',
    heureDepart: ''
 
  
  };

  constructor(
    private presenceService: PresenceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.presenceId = this.route.snapshot.paramMap.get('id')!;

    this.isEditMode = !!this.presenceId;

    if (this.isEditMode && this.presenceId) {
      this.presenceService.getPresence(this.presenceId).subscribe({
        next: (response) => {
          this.presence = {
            _id: this.presenceId,
            date: response.date,
            heureDepart: response.heureDepart,
            heureArrive: response.heureArrive
        

          };
        },
        error: (error) => {
          console.error('Error loading presence', error);
          alert('Error loading presence data');
        }
      });
    }
  }

  onSubmit(): void {
    const request$ = this.isEditMode && this.presenceId
      ? this.presenceService.updatePresence(this.presenceId, this.presence)
      : this.presenceService.createPresence(this.presence);

    request$.subscribe({
      next: () => {
        alert(`Presence ${this.isEditMode ? 'updated' : 'created'} successfully!`);
        this.router.navigate(['/presences']);
      },
      error: (error) => {
        console.error('Error saving presence', error);
        alert(`Error ${this.isEditMode ? 'updating' : 'creating'} presence. Please try again.`);
      }
    });
  }
}
