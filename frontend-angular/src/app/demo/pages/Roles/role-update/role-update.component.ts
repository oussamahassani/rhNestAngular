// angular imports
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RoleService } from 'src/app/services/role.service';

// bootstrap imports
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// third-party imports
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-role-update',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {
  roleId: string = '';
  isEditMode = false;

  role = {
    _id: "",
    name: ''
  };

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id')!;

    this.isEditMode = !!this.roleId;

    if (this.isEditMode && this.roleId) {
      this.roleService.getRole(this.roleId).subscribe({
        next: (response) => {
          this.role = {
            _id: this.roleId,
            name: response.name

          };
        },
        error: (error) => {
          console.error('Error loading role', error);
          alert('Error loading role data');
        }
      });
    }
  }

  onSubmit(): void {
    const request$ = this.isEditMode && this.roleId
      ? this.roleService.updateRole(this.roleId, this.role)
      : this.roleService.createRole(this.role);

    request$.subscribe({
      next: () => {
        alert(`Role ${this.isEditMode ? 'updated' : 'created'} successfully!`);
        this.router.navigate(['/roles']);
      },
      error: (error) => {
        console.error('Error saving role', error);
        alert(`Error ${this.isEditMode ? 'updating' : 'creating'} role. Please try again.`);
      }
    });
  }
}
