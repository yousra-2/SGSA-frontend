import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private router: Router) {} // Injection du router

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

  logout(): void {
    // Logique de déconnexion ici (par exemple, suppression des informations d'authentification)
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
