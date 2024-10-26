import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = 'http://localhost:8085';
  

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  AfficherNotes(id_etudiant: number): Observable<any> {

    const token = this.localStorageService.get('token'); // Récupérer le token stocké
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token au header
    return this.http.get<any>(`${this.apiUrl}/etudiants/${id_etudiant}/notes/modules`, { headers });
  }

  VoirAttestation(id_etudiant: number): Observable<Blob> {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Blob>(`${this.apiUrl}/etudiants/attestation/${id_etudiant}`, {
      headers,
      responseType: 'blob' as 'json'
    });
  }
}
