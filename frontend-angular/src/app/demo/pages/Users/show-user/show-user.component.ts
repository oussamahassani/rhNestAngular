import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model'; 
@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [SharedModule, CommonModule, HttpClientModule],
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export default class ShowUserComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  editUser(userId: string): void {
    if (userId === undefined) {
      console.error('User ID is undefined');
      return;
    }
    this.router.navigate(['/users/edit', userId]);
  }

  loadUsers(): void {
    this.loading = true;
    this.spinner.show();

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.toastr.error('Failed to load users', 'Error');
        this.loading = false;
        this.spinner.hide();
      }
    });
  }
  isRoleObject(role: any): role is Role {
  return role && typeof role === 'object' && 'name' in role;
}

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.toastr.success('User deleted successfully', 'Success');
          this.loadUsers(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.toastr.error('Failed to delete user', 'Error');
        }
      });
    }
  }

isEmployee(user: any): boolean {
  return user.role?.name?.toLowerCase() === 'employee';
}

// Optionnel : Si tu veux afficher les colonnes Poste/Date seulement si un employé existe
displayPoste(): boolean {
  return this.users?.some(u => this.isEmployee(u));
}


}
