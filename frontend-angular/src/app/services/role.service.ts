// src/app/services/role.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewRole, Role } from '../models/role.model';
import {encryptData} from './utlisDataSensitive'

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:3003/roles'; // Update with your Spring Boot server URL

  constructor(private http: HttpClient) {}

  // Get all users
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}`);
  }

  // Get a single role by ID
  getRole(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  // Create a new role
  createRole(role: NewRole): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, {role:encryptData(role, 'MA_CLE_SECRETE')});
  }

  // Update an existing role
  updateRole(id: string, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, role);
  }

  // Delete a role
  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
