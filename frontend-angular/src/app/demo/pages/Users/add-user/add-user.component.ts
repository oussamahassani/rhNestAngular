import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Project imports
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';

// Bootstrap
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export default class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  roles: Role[] = [];
  showSubscriptionForm = false;
  subscriptionPlans = ['free', 'basic', 'premium', 'enterprise'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/)
      ]],
      role: ['', Validators.required],
      poste: [''],
      date: [''],
      hasSubscription: [false],
      subscription: this.fb.group({
        planType: ['free'],
        startDate: [new Date().toISOString().split('T')[0]],
        endDate: [''],
        isActive: [true],
        paymentMethod: ['none'],
        autoRenew: [false]
      })
    });

    this.userForm.get('hasSubscription')?.valueChanges.subscribe(hasSub => {
      this.showSubscriptionForm = hasSub;
    });
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
        alert('Erreur lors du chargement des rôles.');
      }
    });
  }

  isEmployee(): boolean {
    const roleId = this.userForm.get('role')?.value;
    const employeeRole = this.roles.find(r => r.name.toLowerCase() === 'employee');
    return employeeRole ? roleId === employeeRole._id : false;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value;
    const newUser: any = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role,
      poste: this.isEmployee() ? formValue.poste : undefined,
      date: this.isEmployee() ? formValue.date : undefined
    };

    // Add subscription data if enabled
    if (formValue.hasSubscription) {
      newUser.abonnement = {
        ...formValue.subscription,
        // Convert string dates to Date objects
        startDate: new Date(formValue.subscription.startDate),
        endDate: formValue.subscription.endDate ? new Date(formValue.subscription.endDate) : undefined
      };
    }

    this.userService.createUser(newUser).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès.');
        this.userForm.reset();
        this.initForm(); // Reset form to initial state
      },
      error: (error) => {
        console.error('Erreur lors de la création de l’utilisateur :', error);
        alert('Erreur lors de la création de l’utilisateur.');
      }
    });
  }

  passwordInvalid(): boolean {
    const password = this.userForm.get('password');
    return password ? password.invalid && password.touched : false;
  }
}