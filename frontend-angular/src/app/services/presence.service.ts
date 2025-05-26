// src/app/services/presence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewPresence, Presence } from '../models/presence.model ';


@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private apiUrl = 'http://localhost:3003/presences'; // Adapté à ton serveur Spring Boot

  constructor(private http: HttpClient) {}

  getAllPresences(): Observable<Presence[]> {
    return this.http.get<Presence[]>(this.apiUrl);
  }

  getPresence(id: string): Observable<Presence> {
    return this.http.get<Presence>(`${this.apiUrl}/${id}`);
  }

  createPresence(presence: NewPresence): Observable<Presence> {
    return this.http.post<Presence>(this.apiUrl, presence);
  }

  updatePresence(id: string, updates: Partial<Presence>): Observable<Presence> {
    return this.http.patch<Presence>(`${this.apiUrl}/${id}`, updates);
  }

  deletePresence(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
