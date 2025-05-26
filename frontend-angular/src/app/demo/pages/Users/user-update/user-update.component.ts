// Angular imports
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

// Bootstrap imports
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Third-party imports
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbDropdownModule, ColorPickerModule, FormsModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  userId: string = '';
  isEditMode = false;
  roles: Role[] = [];
  loading = false;

  user: User = {
    _id: '',
    name: '',
    password: '',
    email: '',
    role: { _id: '', name: '' },  // role initialisé en objet vide
    poste: '',
    date: ''
  };

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.isEditMode = true;

      this.userService.getUser(this.userId).subscribe({
        next: (response) => {
          // Ici on attend que response.role soit un objet Role complet
          this.user = {
            _id: this.userId,
            name: response.name,
            email: response.email,
            password: '',
            role: response.role,
            poste: response.poste ?? '',
            date: response.date ?? ''
          };
        },
        error: (error) => {
          console.error('Error loading user', error);
          alert('Error loading user data');
        }
      });
    }

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
    const userData: any = {
      _id: this.userId,
      name: this.user.name,
      email: this.user.email,
      role: this.user.role
    };

    if (this.user.password) {
      userData.password = this.user.password;
    }

    if (this.isEmployee()) {
      userData.poste = this.user.poste;
      userData.date = this.user.date;
    }

    this.loading = true;

    const request$ = this.userService.updateUser(this.userId, userData);

    request$.subscribe({
      next: () => {
        this.loading = false;
        alert(`User ${this.isEditMode ? 'updated' : 'created'} successfully!`);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error saving user', error);
        alert(`Error ${this.isEditMode ? 'updating' : 'creating'} user. Please try again.`);
      }
    });
  }
}
