import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../Models/Etudiant';
import { ProjetAcademique } from '../Models/ProjetAcadimique';
import { Enseignant } from '../Models/Enseignant';
import { Matiere } from '../Models/Matiere';

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
  getProfil(id_etudiant: number): Observable<Etudiant> {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Etudiant>(`${this.apiUrl}/etudiants/${id_etudiant}`, { headers });
  }

  getProjetsByEtudiantId(etudiantId: number): Observable<ProjetAcademique[]> {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProjetAcademique[]>(`${this.apiUrl}/etudiants/projet/${etudiantId}`, { headers });
  }
  
  addProject(project: ProjetAcademique): Observable<Blob> {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Blob>(`${this.apiUrl}/etudiants/convention`, project, {
      headers,
      responseType: 'blob' as 'json' // Spécifie que la réponse est un fichier Blob
    });
  }
  getAllEnseignants(): Observable<Enseignant[]> {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Enseignant[]>(`${this.apiUrl}/etudiants/enseignants`, { headers });
  }
  getMatieresByEtudiantId(etudiantId: number): Observable<Matiere[]> {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Matiere[]>(`${this.apiUrl}/etudiants/matiers/${etudiantId}`, { headers });
  }
  getCoursByMatiereId(matiereId: number): Observable<any[]> {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/matieres/${matiereId}/cours`, { headers });
  }
  
  
}
