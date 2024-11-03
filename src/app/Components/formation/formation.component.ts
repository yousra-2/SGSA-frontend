import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class FormationComponent {
  nom: string = '';
  description: string = '';
  duree: number | null = null;
  formations: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isEditMode: boolean = false;
  selectedFormationId: number | null = null;
  isFormVisible: boolean = false; // Pour gérer l'affichage du formulaire

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {}
  goBack() {
    this.router.navigate(['/dashboard']);
  }
  ngOnInit(): void {

    if (typeof window !== 'undefined' && localStorage) {
      // Accéder à localStorage
      const token = this.localStorageService.get('token');
      console.log(token);
    }

    this.getFormations();


  }

  addFormation(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const formationData = {
      nom: this.nom,
      description: this.description,
      duree: this.duree
    };

    this.http.post('http://localhost:8085/api/formations', formationData, { headers }).subscribe(
      (response) => {
        this.successMessage = 'Formation ajoutée avec succès!';
        this.clearForm();
        this.getFormations();
      },
      (error) => {
        this.errorMessage = 'error au niveau de l\'ajout';
        console.error('la formation deja existe ou ajouter plus de details au niveau de la description', error);
      }
    );
  }

  editFormation(formation: any): void {
    this.isEditMode = true;
    this.selectedFormationId = formation.id;
    this.nom = formation.nom;
    this.description = formation.description;
    this.duree = formation.duree;
    this.isFormVisible = true; // Afficher le formulaire lors de l'édition
  }

  updateFormation(): void {
    if (!this.selectedFormationId) {
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const formationData = {
      nom: this.nom,
      description: this.description,
      duree: this.duree
    };

    this.http.put(`http://localhost:8085/api/formations/${this.selectedFormationId}`, formationData, { headers }).subscribe(
      (response) => {
        this.successMessage = 'Formation modifiée avec succès!';
        this.clearForm();
        this.getFormations();
        this.isEditMode = false;
        this.selectedFormationId = null;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la modification cette formation existe deja';
        console.error('Erreur lors de la modification de la formation:', error);
      }
    );
  }

  getFormations(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<any[]>('http://localhost:8085/api/formations', { headers }).subscribe(
      (response) => {
        this.formations = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des formations:', error);
        this.errorMessage = 'Erreur lors de la récupération des formations.';
      }
    );
  }

  clearForm(): void {
    this.nom = '';
    this.description = '';
    this.duree = null;
    this.isEditMode = false;
    this.selectedFormationId = null;
    this.isFormVisible = false; // Cacher le formulaire
    this.successMessage = '';
    this.errorMessage = '';
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.clearForm(); // Réinitialiser le formulaire lors de la fermeture
    }
  }

  logout(): void {
    // Supprimer le token du localStorage
    this.localStorageService.remove('token');

    // Rediriger l'utilisateur vers la page de connexion
    this.router.navigate(['/login']).then(() => {
        // Rafraîchir la page après la redirection
        location.reload();
    });
}
}
