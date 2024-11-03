import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errorMessage: string = ''; // Message d'erreur
 // Dans le composant TypeScript
isSidebarVisible: boolean = true;

// toggleSidebar() {
//   this.isSidebarVisible = !this.isSidebarVisible;
// }


  constructor(private router: Router, private localStorageService: LocalStorageService) {} // Injection du router

  ngOnInit(): void {
    // Initialisation, aucune statistique à charger
  }

  navigateToModules(): void {
    this.router.navigate(['/module']); // Redirige vers la page de gestion des modules
  }

  navigateToFormation(): void {
    this.router.navigate(['/formation']); // Redirige vers la page de gestion des étudiants
  }

  navigateToEnseignants(): void {
    this.router.navigate(['/directeur-dashboard']); // Redirige vers la page de gestion des enseignants
  }
  navigateToEtudiants(): void {
    this.router.navigate(['/etugestion']); // Redirige vers la page de gestion des enseignants
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
