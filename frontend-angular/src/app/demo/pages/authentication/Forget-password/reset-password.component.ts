import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule, Router } from '@angular/router';

@Component({
      standalone: true,
      imports: [SharedModule, RouterModule, ReactiveFormsModule],
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: UserService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    }, );
  }


  onSubmit() {
    this.submitted = true;

    if (this.resetForm.invalid) return;

    const { email } = this.resetForm.value;

    this.authService.resetPassword(email).subscribe({
      next: () => {
        this.successMessage = 'Mot de passe réinitialisé avec succès.';
        this.errorMessage = '';
      },
      error: (err:any) => {
        this.errorMessage = err.error?.message || 'Erreur lors de la réinitialisation.';
        this.successMessage = '';
      },
    });
  }
}
