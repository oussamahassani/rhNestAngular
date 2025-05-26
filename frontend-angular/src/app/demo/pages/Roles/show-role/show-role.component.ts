import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
//show-role
@Component({
  selector: 'app-show-role',
  standalone: true,
  imports: [SharedModule, CommonModule, HttpClientModule],
  templateUrl: './show-role.component.html',
  styleUrls: ['./show-role.component.scss']
})
export default class ShowRoleComponent implements OnInit {
  roles: Role[] = [];
  loading = false;

  constructor(
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }
  editRole(roleId: string): void {
    if (roleId === undefined) {
      console.error('Role ID is undefined');
      return;
    }
    this.router.navigate(['/roles/edit', roleId]);
  }
  loadRoles(): void {
    this.loading = true;
    this.spinner.show();

    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loading = false;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error loading roles:', error);
        this.toastr.error('Failed to load roles', 'Error');
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  deleteRole(id: string): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(id).subscribe({
        next: () => {
          this.toastr.success('Role deleted successfully', 'Success');
          this.loadRoles(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting role:', error);
          this.toastr.error('Failed to delete role', 'Error');
        }
      });
    }
  }
}
