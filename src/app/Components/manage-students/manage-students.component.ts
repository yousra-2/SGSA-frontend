


import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface StudentNote {
  valeur: number;
  etudiantFirstName: string;
  etudiantLastName: string;
  matiereNom: string;
  id_etudiant: number; // Ajoutez cette propriété
}

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css'],
  standalone: true,
  imports: [
    CommonModule,  // Nécessaire pour les directives Angular de base
    FormsModule    // Nécessaire pour ngModel
  ]
})
export class ManageStudentsComponent {
  matiereId!: number;
  studentNotes: StudentNote[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.matiereId = +params['matiereId'];
      this.loadStudentNotes();
    });
  }

  loadStudentNotes(): void {
    const token = localStorage.getItem('token');
  
    if (!token) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      setTimeout(() => this.router.navigate(['/login']), 1000);
      return;
    }
  
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `http://localhost:8085/api/notes/matiere/${this.matiereId}`;
  
    this.http.get<StudentNote[]>(url, { headers }).subscribe(
      (data) => {
        this.studentNotes = data.map(note => ({
          ...note,
          etudiantId: note.id_etudiant // Ajoutez l'ID de l'étudiant
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des notes:', error);
        this.errorMessage = 'Erreur lors de la récupération des notes.';
      }
    );
  }
  


  updateNote(etudiantId: number, matiereId: number, newValeur: number): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `http://localhost:8085/api/notes/etudiant/${etudiantId}/matiere/${matiereId}`;

    this.http.put(url, { newValeur }, { headers }).subscribe(
      () => {
        this.loadStudentNotes(); // Reload notes after update
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la note:', error);
        this.errorMessage = 'Erreur lors de la mise à jour de la note.';
      }
    );
  }
  updateAllNotes(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}` };

    const updateRequests = this.studentNotes.map(note => {
      const url = `http://localhost:8085/api/notes/etudiant/${note.id_etudiant}/matiere/${this.matiereId}`;
      return this.http.put(url, { newValeur: note.valeur }, { headers }).toPromise();
    });

    Promise.all(updateRequests)
      .then(() => {
        this.loadStudentNotes(); // Rechargez les notes après la mise à jour
        alert('Toutes les notes ont été mises à jour avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour des notes:', error);
        this.errorMessage = 'la note dois etre comprise entre 0 et 20 svp';
      });
  }

}
























