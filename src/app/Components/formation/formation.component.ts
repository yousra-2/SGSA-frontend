
// import { Component } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-formation',
//   templateUrl: './formation.component.html',
//   styleUrls: ['./formation.component.css'],
//   standalone: true,
//   imports: [HttpClientModule, FormsModule, CommonModule]
// })
// export class FormationComponent {
//   nom: string = '';
//   description: string = '';
//   duree: string = '';
//   formations: any[] = [];
//   errorMessage: string = '';
//   successMessage: string = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   // Méthode pour ajouter une formation
//   addFormation(): void {
//     // Vérification de la longueur de la description
//     if (this.description.length < 10) {
//       this.errorMessage = 'La description doit contenir au moins 10 caractères.';
//       return; // Arrêter l'exécution si la condition n'est pas remplie
//     }

//     const token = localStorage.getItem('token'); // Récupérer le token du localStorage

//     const headers = {
//       'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes
//       'Content-Type': 'application/json'
//     };

//     const formationData = {
//       nom: this.nom,
//       description: this.description,
//       duree: parseInt(this.duree, 10), // Convertir en entier
//     };

//     this.http.post('http://localhost:8085/api/formations', formationData, { headers }).subscribe(
//       (response) => {
//         console.log('Formation ajoutée avec succès:', response);
//         this.successMessage = 'Formation ajoutée avec succès!';
//         this.clearForm(); // Réinitialiser le formulaire après succès
//         this.getFormations(); // Rafraîchir la liste des formations
//       },
//       (error) => {
//         this.errorMessage = 'Erreur lors de l\'ajout de la formation.';
//         console.error('Erreur lors de l\'ajout de la formation:', error);
//         console.error('Détails de l\'erreur:', error.error); // Loguer les détails de l'erreur
//       }
//     );
//   }

//   // Méthode pour récupérer toutes les formations
//   getFormations(): void {
//     const token = localStorage.getItem('token'); // Récupérer le token du localStorage

//     const headers = {
//       'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes
//       'Content-Type': 'application/json'
//     };

//     this.http.get<any[]>('http://localhost:8085/api/formations', { headers }).subscribe(
//       (response) => {
//         this.formations = response;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des formations:', error);
//         this.errorMessage = 'Erreur lors de la récupération des formations.';
//       }
//     );
//   }

//   // Méthode pour réinitialiser le formulaire
//   clearForm(): void {
//     this.nom = '';
//     this.description = '';
//     this.duree = '';
//   }

//   // Méthode appelée lors de l'initialisation du composant
//   ngOnInit(): void {
//     this.getFormations(); // Charger les formations à l'initialisation
//   }
// }

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
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
        this.errorMessage = 'Erreur lors de l\'ajout de la formation.';
        console.error('Erreur lors de l\'ajout de la formation:', error);
      }
    );
  }

  editFormation(formation: any): void {
    this.isEditMode = true;
    this.selectedFormationId = formation.id;
    this.nom = formation.nom;
    this.description = formation.description;
    this.duree = formation.duree;
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
        this.errorMessage = 'Erreur lors de la modification de la formation.';
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
    this.successMessage = '';
    this.errorMessage = '';
  }
}
