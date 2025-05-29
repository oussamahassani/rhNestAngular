// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser, User } from '../models/user.model';
import {encryptData} from './utlisDataSensitive'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3003/users'; // Update with your Spring Boot server URL
  private apiPayementUrl = 'http://localhost:3003'; // Update with your Spring Boot server URL

  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
resetPassword(email: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      email:encryptData(email, 'MA_CLE_SECRETE'),
    });
  }
  createPayement(){
     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let orderId = '';
  for (let i = 0; i < length; i++) {
    orderId += chars.charAt(Math.floor(Math.random() * chars.length));
  }


    return this.http.post(`${this.apiPayementUrl}/payments/initiate`, {
   "name": "employee",
  "user": "68344752bae5a5dd4f296ef4",
  "amount": 1380,
    "receiverWalletId": "6838782ada51a7fbaba21c57",
  "token": "TND",
  "type": "immediate",
  "description": "payment description",
  "acceptedPaymentMethods": [
    "wallet",
    "bank_card",
    "e-DINAR"
  ],
  "lifespan": 10,
  "checkoutForm": true,
  "addPaymentFeesToAmount": true,
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "22777777",
  "email": "john.doe@gmail.com",
  "orderId": orderId,
  "webhook": "https://merchant.tech/api/notification_payment",
  "silentWebhook": true,
  "successUrl": "http://localhost:4200/auth/payment-success",
  "failUrl": "https://localhost:4200/auth/payement-error",
    });
  }
  // Get a single user by ID
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Create a new user
  createUser(user: NewUser): Observable<User> {
    return this.http.post<User>(this.apiUrl,{payload:encryptData(user,'MA_CLE_SECRETE')} );
  }
NewcreateUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`,   {payload:encryptData(user,'MA_CLE_SECRETE')});
  }
  // Update an existing user
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
