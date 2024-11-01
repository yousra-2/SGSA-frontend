import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service'; // Import LocalStorageService

@Component({
  selector: 'app-modifier-enseignant',
  templateUrl: './modifier-enseignant.component.html',
})
export class ModifierEnseignantComponent implements OnInit {
  enseignant: any = {};
  errorMessage: string = '';
  successMessage: string = '';
  apiUrl = 'http://localhost:8085/api/enseignants';
  enseignantId: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService // Inject LocalStorageService
  ) {}

  ngOnInit(): void {
    this.enseignantId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEnseignant();
  }

  loadEnseignant(): void {
    const token = this.localStorageService.get('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set the Authorization header
    });

    this.http.get(`${this.apiUrl}/${this.enseignantId}`, { headers }).subscribe(
      (data) => {
        this.enseignant = data;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement de l\'enseignant';
        console.error(error);
      }
    );
  }

  updateEnseignant(): void {
    const token = this.localStorageService.get('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set the Authorization header
    });

    this.http.put(`${this.apiUrl}/${this.enseignantId}`, this.enseignant, { headers }).subscribe(
      () => {
        this.successMessage = 'Enseignant modifié avec succès.';
        this.router.navigate(['/directeur-dashboard']);
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la modification de l\'enseignant';
        console.error(error);
      }
    );
  }
}
