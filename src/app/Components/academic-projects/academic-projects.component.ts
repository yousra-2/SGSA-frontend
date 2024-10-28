import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importation de CommonModule

interface ProjetAcademique {
  id: number;
  date_affectation: Date;
  date_universitaire: Date;
  statut: string;
  titre: string;
  type: string;
  enseignant_id: number;
  etudiant_id: number;
  sujet: string;
  datedebut: Date;
  datefin: Date;
  societe: string;
}

@Component({
  selector: 'app-academic-projects',
  templateUrl: './academic-projects.component.html',
  styleUrls: ['./academic-projects.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,  // Ajout de HttpClientModule
    CommonModule       // Ajout de CommonModule
  ]
})
export class AcademicProjectsComponent implements OnInit {
  projets: ProjetAcademique[] = [];
  errorMessage: string = '';
  enseignantId: string | null = null;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.enseignantId = this.route.snapshot.paramMap.get('enseignantId');
    this.loadProjets();
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
      this.errorMessage =
        'Erreur lors de la récupération des projets : ' +
        (error.message || 'Erreur inconnue');
    }
  }
}
