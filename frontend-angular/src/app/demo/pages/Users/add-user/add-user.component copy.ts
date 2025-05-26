import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role.model';

// Bootstrap import
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Third-party import
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export default class AddUserComponent implements OnInit {
  user: User = {
    _id: '',
    name: '',
    password: '',
    email: '',
    role: { _id: '', name: '' },
    poste: '',
    date: ''
  };

  roles: Role[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
        alert('Error loading roles. Please try again.');
      }
    });
  }

 isEmployee(): boolean {
  const employeeRole = this.roles.find(r => r.name.toLowerCase() === 'employee');
  if (!employeeRole) return false;

  const roleId = typeof this.user.role === 'string' ? this.user.role : this.user.role._id;
  return roleId === employeeRole._id;
}

  onSubmit(): void {
    // Basic form validation
    if (!this.user.name || !this.user.email || !this.user.password || !this.user.role) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEmployee() && (!this.user.poste || !this.user.date)) {
      alert('Please fill in poste and date for employees.');
      return;
    }

    const newUser: Omit<User, '_id'> = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
      poste: this.isEmployee() ? this.user.poste : '',
      date: this.isEmployee() ? this.user.date : ''
    };

    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        alert('User created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
      }
    });
  }

  private resetForm(): void {
    this.user = {
      _id: '',
      name: '',
      email: '',
      password: '',
      role: { _id: '', name: '' },
      poste: '',
      date: ''
    };
  }
}
