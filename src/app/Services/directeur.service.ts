import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { Etudiant } from '../Models/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class DirecteurService {

  private apiUrl = 'http://localhost:8085';
  

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  AfficherEtudiants(): Observable<Etudiant[]> {

    const token = this.localStorageService.get('token'); // Récupérer le token stocké
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token au header
    return this.http.get<Etudiant[]>(`${this.apiUrl}/directeurs/GetAllEtudiants`, { headers });
  }

  AjouteEtudiant(etudiant: Etudiant): Observable<any> {

    const token = this.localStorageService.get('token'); // Récupérer le token stocké
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token au header
    return this.http.post<any>(`${this.apiUrl}/directeurs/register/etudiant`, etudiant,{ headers });
  }

  SupprimerEtudiant(id_etudiant: number): Observable<any> {

    const token = this.localStorageService.get('token'); // Récupérer le token stocké
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token au header
    return this.http.put(`${this.apiUrl}/directeurs/delete/etudiant/${id_etudiant}`, {}, { headers });
  }

  ModifierEtudiant(id_etudiant: number, etudiant: Etudiant): Observable<any> {
    
    const token = this.localStorageService.get('token'); // Récupérer le token stocké
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token au header
    return this.http.put(`${this.apiUrl}/directeurs/update/etudiant/${id_etudiant}`, etudiant, { headers });
}

getEtudiantNumber(): Observable<number> {

  const token = this.localStorageService.get('token'); // Récupérer le token stocké
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token au header
  return this.http.get<number>(`${this.apiUrl}/directeurs/nombre/etudiants`, { headers });
}

getEnseignantNumber(): Observable<number> {

  const token = this.localStorageService.get('token'); // Récupérer le token stocké
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token au header
  return this.http.get<number>(`${this.apiUrl}/directeurs/nombre/enseignants`, { headers });
}

}
