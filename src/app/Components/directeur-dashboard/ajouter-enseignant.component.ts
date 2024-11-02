import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Ajoutez cette ligne

@Component({
  selector: 'app-ajouter-enseignant',
  templateUrl: './ajouter-enseignant.component.html',
  styleUrls: ['./ajouter-enseignant.component.css']

})
export class AjouterEnseignantComponent {
  enseignant = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    specialite: ''
  };
  goBack() {
    this.router.navigate(['/directeur-dashboard']);
  }
  errorMessage: string = '';
  successMessage: string = '';
  apiUrl = 'http://localhost:8085/api/enseignants'; // Mettez à jour l'URL si nécessaire

  constructor(private http: HttpClient, private router: Router) { }

  addEnseignant(): void {
    const token = localStorage.getItem('token'); // Récupérer le token
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
    });

    this.http.post(this.apiUrl, this.enseignant, { headers }).subscribe(
        () => {
            this.successMessage = 'Enseignant ajouté avec succès.';
            this.router.navigate(['/directeur-dashboard']);
        },
        (error) => {
            this.errorMessage = 'Erreur lors de l\'ajout de l\'enseignant';
            console.error(error);
            if (error.status === 401) {
                alert('Session expirée. Veuillez vous reconnecter.');
                this.router.navigate(['/login']);
            }
        }
    );
}

}
