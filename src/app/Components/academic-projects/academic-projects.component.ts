import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { MatCardModule } from '@angular/material/card';    // Import MatCardModule
import { MatInputModule } from '@angular/material/input';  // Import MatInputModule (if needed for input fields)
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule (if needed for form fields)

interface Etudiant {
  id: number;
  firstName: string;
  lastName: string;
  // Ajoutez d'autres propriétés selon votre modèle
}

interface ProjetAcademique {
  id: number;
  date_affectation: Date | null; // Ajouter null si c'est possible
  dateUniversitaire: string; // Modifiez selon le format reçu
  statut: string;
  titre: string;
  type: string;
  enseignant_id: number | null; // S'il n'est pas toujours présent
  etudiant: Etudiant | null; 
  sujet: string | null; // Ajouter null si c'est possible
  datedebut: Date | null; // Ajouter null si c'est possible
  datefin: Date | null; // Ajouter null si c'est possible
  societe: string | null; // Ajouter null si c'est possible
}

@Component({
  selector: 'app-academic-projects',
  templateUrl: './academic-projects.component.html',
  styleUrls: ['./academic-projects.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatTableModule,   // Add MatTableModule to imports
    MatCardModule,    // Add MatCardModule to imports
    MatInputModule,   // Optional: Add for input fields
    MatFormFieldModule // Optional: Add for form fields
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
