import { Component } from '@angular/core';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
