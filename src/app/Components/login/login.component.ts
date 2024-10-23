import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiLoginService: LoginService, private router: Router) {}

  login() {
    this.apiLoginService.login(this.username, this.password).subscribe(response => {
      // Enregistrer le token JWT dans le localStorage
      localStorage.setItem('token', response.token);
      
      // Vérifier les rôles et rediriger l'utilisateur
      const roles = response.roles.map(role => role.authority); // Assurez-vous d'extraire le nom du rôle
      console.log('Roles:', roles); // Pour déboguer

      if (roles.includes('ROLE_ETUDIANT')) {
        this.router.navigate(['/etudiant-dashboard']); // Redirection vers le tableau de bord étudiant
      } else if (roles.includes('ROLE_ENSEIGNANT')) {
        this.router.navigate(['/enseignant-dashboard']); // Redirection vers le tableau de bord enseignant
      } else if (roles.includes('ROLE_DIRECTEUR')) {
        this.router.navigate(['/directeur-dashboard']); // Redirection vers le tableau de bord directeur
      } else {
        this.errorMessage = 'Rôle non reconnu';
      }
      console.log('Login successful!', response);
    }, error => {
      this.errorMessage = 'Erreur, username ou password incorrect';
      this.hideErrorMessageAfterDelay();
    });
  }

    hideErrorMessageAfterDelay() {
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    }
  
    ngOnInit(): void {
    }
  


}
