// Angular imports
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role.model';

// Bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Third-party import
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export default class AddRoleComponent {
  role: Role = {
    _id: '',
    name: ''
  
  };

  constructor(private roleService: RoleService) {}

  onSubmit(): void {
    const newRole: Omit<Role, '_id'> = {
      name: this.role.name
    };

    this.roleService.createRole(newRole).subscribe({
      next: (response) => {
        console.log('Role created successfully:', response);
        alert('Role created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating role:', error);
        alert('Error creating role. Please try again.');
      }
    });
  }

  private resetForm(): void {
    this.role = {
      _id: '',
      name: ''
    
    };
  }
}
