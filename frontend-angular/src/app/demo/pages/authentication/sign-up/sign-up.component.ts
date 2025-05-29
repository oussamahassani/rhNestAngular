import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SharedModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent {
  signupForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nameorg:['', [Validators.required]],
          /*   password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/
          ),
        ],
      ], */
      role: ['admin'] // Default role
    });
  }
hasPasswordPatternError(): boolean {
  return this.signupForm.get('password')?.hasError('pattern') ?? false;
}
  onSubmit() {
    if (this.signupForm.invalid) {
      this.toastr.error('Please fill all required fields correctly');
      return;
    }

    this.loading = true;
    const signupData = this.signupForm.value;
    const newUser: Omit<any, '_id'> = {
      name: signupData.name,
      nameorg:signupData.nameorg,
      email: signupData.email,
      password: signupData.password,
      pack:localStorage.getItem('pack')
    //  role: "employee" 
    };
localStorage.setItem('user' , JSON.stringify(newUser));
this.userService.createPayement().subscribe({
      next: (response:any) => {
     if (response.payUrl) {
          window.location.href = response.payUrl; // ⬅️ Redirects the user
        }
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.toastr.error(error.error?.message || 'Registration failed');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  /*  this.userService.NewcreateUser(newUser).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful!');
        this.router.navigate(['/auth/signin']);
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.toastr.error(error.error?.message || 'Registration failed');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });*/
  }
    
}
