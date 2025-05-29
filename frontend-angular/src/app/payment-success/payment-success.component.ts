import { Component } from '@angular/core';
import { json } from 'node:stream/consumers';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-success',
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {
    loading = false;

 constructor(
  
    private userService: UserService,
     private toastr: ToastrService

  ){

let user = localStorage.getItem('user' );

if(user){
  let newUser = JSON.parse(user);
 this.userService.NewcreateUser(newUser).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful!');
       
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
}
    
  }
}
