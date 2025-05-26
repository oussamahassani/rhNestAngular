import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../models/demande.model';

@Injectable({
  providedIn: 'root',
})
export class DemandeService {
  private apiUrl = 'http://localhost:3003/demandes'; // Adapte selon ton backend

  constructor(private http: HttpClient) {}

  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl);
  }

  getDemandeById(id: string): Observable<Demande> {
    return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  createDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande);
  }

  updateDemande(id: string, demande: Partial<Demande>): Observable<Demande> {
    return this.http.put<Demande>(`${this.apiUrl}/${id}`, demande);
  }

  deleteDemande(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

//pour modifier status


  updateStatus(id: string, status: 'en attente' | 'accepté' | 'refusé') {
    return this.http.patch<Demande>(`${this.apiUrl}/${id}/status`, { status });
  }
  

}
