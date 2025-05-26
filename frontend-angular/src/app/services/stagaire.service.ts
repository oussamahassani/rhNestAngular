// src/app/services/stagaire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewStagaire, Stagaire } from '../models/stagaire.model';

@Injectable({
  providedIn: 'root'
})
export class StagaireService {
  private apiUrl = 'http://localhost:3003/stagaires'; // Update with your Spring Boot server URL

  constructor(private http: HttpClient) {}

  // Get all users
  getAllStagaires(): Observable<Stagaire[]> {
    return this.http.get<Stagaire[]>(`${this.apiUrl}`);
  }

  // Get a single stagaire by ID
  getStagaire(id: string): Observable<Stagaire> {
    return this.http.get<Stagaire>(`${this.apiUrl}/${id}`);
  }

  // Create a new stagaire
  createStagaire(stagaire: NewStagaire): Observable<Stagaire> {
    return this.http.post<Stagaire>(this.apiUrl, stagaire);
  }

  // Update an existing stagaire
  updateStagaire(id: string, stagaire: Stagaire): Observable<Stagaire> {
    return this.http.put<Stagaire>(`${this.apiUrl}/${id}`, stagaire);
  }

  // Delete a stagaire
  deleteStagaire(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
