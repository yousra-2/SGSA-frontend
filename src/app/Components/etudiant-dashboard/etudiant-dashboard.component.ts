import { Component } from '@angular/core';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-dashboard',
  templateUrl: './etudiant-dashboard.component.html',
  styleUrl: './etudiant-dashboard.component.css'
})
export class EtudiantDashboardComponent {

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      // Accéder à localStorage
      const token = this.localStorageService.get('token');
      console.log(token);
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
