import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Etudiant {
  id: number;
  firstName: string;
  lastName: string;
}

interface ProjetAcademique {
  id: number;
  date_affectation: Date | null;
  dateUniversitaire: string;
  statut: string;
  titre: string;
  type: string;
  enseignant_id: number | null;
  etudiant: Etudiant | null;
  sujet: string | null;
  datedebut: Date | null;
  datefin: Date | null;
  societe: string | null;
}

@Component({
  selector: 'app-academic-projects',
  templateUrl: './academic-projects.component.html',
  styleUrls: ['./academic-projects.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AcademicProjectsComponent implements OnInit {
  projets: ProjetAcademique[] = [];
  errorMessage: string = '';
  enseignantId: string | null = null;
  displayedColumns: string[] = [
    'titre', 
    'type', 
    'nom_etudiant', 
    'sujet', 
    'datedebut', 
    'datefin', 
    'societe'
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.enseignantId = this.getUserIdFromToken();
    this.loadProjets();
  }

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null;
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  loadProjets(): void {
    const token = localStorage.getItem('token');

    if (!token || !this.enseignantId) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      setTimeout(() => this.router.navigate(['/login']), 1000);
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `http://localhost:8085/projets/enseignants/${this.enseignantId}`;

    this.http.get<ProjetAcademique[]>(url, { headers }).subscribe(
      (data) => {
        this.projets = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des projets:', error);
        this.handleError(error);
      }
    );
  }

  private handleError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Erreur lors de la récupération des projets : ' + (error.message || 'Erreur inconnue');
    }
  }
}
