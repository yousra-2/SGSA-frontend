import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service'; // Ajoutez cette ligne

@Component({
  selector: 'app-directeur-dashboard',
  templateUrl: './directeur-dashboard.component.html',
  styleUrls: ['./directeur-dashboard.component.css']
})
export class DirecteurDashboardComponent implements OnInit {
  enseignants: any[] = []; // Remplacez `any` par le type de votre modèle enseignant
  errorMessage: string = '';
  successMessage: string = '';
  apiUrl = 'http://localhost:8085/api/enseignants'; // Mettez à jour l'URL si nécessaire
  
  page: number = 1;

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) { } // Ajoutez LocalStorageService ici

  ngOnInit(): void {
    this.loadEnseignants();
  }

  loadEnseignants(): void {
    const token = this.localStorageService.get('token'); // Récupérez le token depuis le localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez le token dans l'en-tête Authorization
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.enseignants = data;
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
          this.router.navigate(['/login']); // Redirection vers la page de login
        } else {
          this.errorMessage = 'Erreur lors du chargement des enseignants';
        }
        console.error(error);
      }
    );
  }

  deleteEnseignant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      const token = this.localStorageService.get('token'); // Récupérez le token depuis le localStorage
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Ajoutez le token dans l'en-tête Authorization
      });

      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
        () => {
          this.loadEnseignants(); // Rechargez la liste des enseignants après suppression
          this.successMessage = 'Enseignant supprimé avec succès.';
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
            this.router.navigate(['/login']); // Redirection vers la page de login
          } else {
            this.errorMessage = 'Erreur lors de la suppression de l\'enseignant';
          }
          console.error(error);
        }
      );
    }
  }
  navigateToAddEnseignant(): void {
    this.router.navigate(['/ajouter-enseignant']);
  }
}
