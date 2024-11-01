
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Ajout de RouterModule

interface Matiere {
  id: number;
  nom: string;
  description: string;
}

@Component({
  selector: 'app-enseignant-dashboard',
  templateUrl: './enseignant-dashboard.component.html',
  styleUrls: ['./enseignant-dashboard.component.css'],
  standalone: true,
  imports: [
    
    FormsModule, CommonModule, RouterModule // Ajout de RouterModule ici
  ]
})
export class EnseignantDashboardComponent implements OnInit {
  matieres: Matiere[] = [];
  errorMessage: string = '';
  enseignantId: string | null = null;  // ID de l'enseignant

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.enseignantId = localStorage.getItem('id_enseignant');
    this.loadMatieres();
  }

  loadMatieres(): void {
    const token = localStorage.getItem('token');
  
    if (!token || !this.enseignantId) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      setTimeout(() => this.router.navigate(['/login']), 1000);
      return;
    }
  
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `http://localhost:8085/account/matieres`;
  
    // Notez que le type de réponse attendu est un tableau d'objets avec id et nom
    this.http.get<{ id: number; nom: string }[]>(url, { headers }).subscribe(
      (data) => {
        console.log('Données reçues:', data);
        this.matieres = data.map((matiere) => ({
          id: matiere.id,
          nom: matiere.nom,
          description: 'Aucune description fournie'
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des matières:', error);
        this.handleError(error);
      }
    );
  }
  

  goToProjects(event: Event): void {
    event.preventDefault();  // Empêche le rechargement
    console.log('ID Enseignant:', this.enseignantId);  // Vérification
  
    if (this.enseignantId) {
      this.router.navigate(['/academic-projects', this.enseignantId]);
    } else {
      this.errorMessage = 'ID enseignant introuvable. Veuillez vous reconnecter.';
    }
  }
  

  private handleError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      this.router.navigate(['/login']);
    } else {
      this.errorMessage =
        'Erreur lors de la récupération des matières : ' +
        (error.message || 'Erreur inconnue');
    }
  }
}
