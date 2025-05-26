// angular import
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.http.post('http://localhost:3003/auth/login', loginData).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('Login successful', response);
        this.isLoading = false;
        this.router.navigate(['/users/show']); // Redirect to dashboard or desired route
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        console.error('Login error', error);
      }
    });
  }
}
