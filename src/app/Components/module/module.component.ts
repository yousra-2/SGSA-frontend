import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {
  nomModule: string = '';
  modules: any[] = [];
  nomMatiere: string = '';
  enseignantId: number = 0;
  formationId: number = 0;
  selectedModuleId: number | null = null;

  // New properties for enseignants and formations
  enseignants: any[] = [];
  formations: any[] = [];

  private baseUrl = 'http://localhost:8085/api/modules';

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadModules();
    this.loadEnseignants(); // Load enseignants
    this.loadFormations();   // Load
    
   
  }

  // Load modules from the API
  loadModules(): void {
    const token = this.localStorageService.get('token'); // Récupérer le token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
    });

    this.http.get<any[]>(this.baseUrl, { headers }).subscribe(
      (data) => {
        this.modules = data;
      },
      (error) => {
        if (error.status === 401) {
          alert('Session expirée. Veuillez vous reconnecter.');
          this.router.navigate(['/login']); // Redirection vers la page de login
        } else {
          alert('Erreur lors du chargement des modules : ' + error.error);
        }
      }
    );
  }

  loadEnseignants(): void {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(`http://localhost:8085/api/enseignants`, { headers }).subscribe(
      (data) => {
        console.log('Enseignants chargés:', data);
        this.enseignants = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des enseignants:', error);
        if (error.status === 401) {
          alert('Session expirée. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        } else {
          alert('Erreur lors du chargement des enseignants : ' + error.error);
        }
      }
    );
  }
  // Charger les matières pour un module spécifique
  loadMatieres(moduleId: number): void {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<any[]>(`http://localhost:8085/modules/${moduleId}/matieres`, { headers }).subscribe(
      (data) => {
        console.log(`Matières chargées pour le module ${moduleId}:`, data); // Ajoutez ce log
        const module = this.modules.find(m => m.id === moduleId);
        if (module) {
          module.matieres = data; // Ajouter les matières au module
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des matières:', error);
      }
    );
  }
  

  // Load formations from the API
  loadFormations(): void {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(`http://localhost:8085/api/formations`, { headers }).subscribe(
      (data) => {
        this.formations = data;
      },
      (error) => {
        if (error.status === 401) {
          alert('Session expirée. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        } else {
          alert('Erreur lors du chargement des formations : ' + error.error);
        }
      }
    );
  }

  // Dans votre ModuleComponent.ts
addModule(): void {
  if (this.nomModule) {
    const token = this.localStorageService.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Envoyer un objet Module avec le champ "nom"
    this.http.post(`${this.baseUrl}/add`, { nom: this.nomModule }, { headers }).subscribe(
      (module) => {
        this.modules.push(module);
        this.nomModule = '';
        alert('Module ajouté avec succès !');
      },
      (error) => {
        if (error.status === 401) {
          alert('Session expirée. Veuillez vous reconnecter.');
          this.router.navigate(['/login']);
        } else {
          alert('ce module existe deja : ' );
        }
      }
    );
  }
}


selectModule(moduleId: number): void {
  this.selectedModuleId = moduleId;
  this.loadMatieres(moduleId); // Charge les matières pour le module sélectionné
}


  // Ajouter une matière
 // Ajouter une matière
addMatiere(): void {
  if (this.selectedModuleId && this.nomMatiere) {
      const token = this.localStorageService.get('token');
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });

      // Envoi de la requête avec des paramètres d'URL
      this.http.post(`${this.baseUrl}/${this.selectedModuleId}/addMatiere?nomMatiere=${this.nomMatiere}&enseignantId=${this.enseignantId}&formationId=${this.formationId}`, {}, { headers }).subscribe(
          (matiere) => {
              alert('Matière ajoutée avec succès !');
              this.nomMatiere = '';
              this.enseignantId = 0;
              this.formationId = 0;
          },
          (error) => {
              if (error.status === 401) {
                  alert('Session expirée. Veuillez vous reconnecter.');
                  this.router.navigate(['/login']);
              } else {
                  // Affichage détaillé de l'erreur
                  alert('Erreur lors de l\'ajout de la matière : ' + JSON.stringify(error.error));
                  console.error('Erreur complète :', error);
              }
          }
      );
  }
}

}
