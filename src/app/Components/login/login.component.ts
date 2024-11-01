import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: { 'ngSkipHydration': '' }
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  targetFiliere = 8;
  targetEnseignants = 105;
  targetEtudiants = 1405;
  targetStages = 609;

  // Variables pour stocker les valeurs affichées
  filiereCount = 0;
  enseignantsCount = 0;
  etudiantsCount = 0;
  stagesCount = 0;

  constructor(private apiLoginService: LoginService, private router: Router, private localStorageService: LocalStorageService) {}


  login() {
    this.apiLoginService.login(this.username, this.password).subscribe(response => {
      // Enregistrer le token JWT dans le localStorage
      this.localStorageService.set('token', response.token);
      
      // Vérifier les rôles et rediriger l'utilisateur
      const roles = response.roles.map(role => role.authority); // Assurez-vous d'extraire le nom du rôle
      console.log('Roles:', roles); // Pour déboguer

      if (roles.includes('ROLE_ETUDIANT')) {
        this.router.navigate(['/etudiant-dashboard']); // Redirection vers le tableau de bord étudiant
      } else if (roles.includes('ROLE_ENSEIGNANT')) {
        this.router.navigate(['/enseignant-dashboard']); // Redirection vers le tableau de bord enseignant
      } else if (roles.includes('ROLE_DIRECTEUR')) {
        this.router.navigate(['/dashboard']); // Redirection vers le tableau de bord directeur
      } else {
        this.errorMessage = 'Rôle non reconnu';
      }
      console.log('Login successful!', response);
    }, error => {
      this.errorMessage = 'Vos données sont incorrectes. Veuillez réessayer.';
      this.hideErrorMessageAfterDelay();
    });
  }



  ngOnInit(): void {
    this.animateCounter('filiereCount', this.targetFiliere, 2000);      // 2000 ms = 2 seconds
    this.animateCounter('enseignantsCount', this.targetEnseignants, 2000);
    this.animateCounter('etudiantsCount', this.targetEtudiants, 2000);
    this.animateCounter('stagesCount', this.targetStages, 2000);
  }

  animateCounter(propertyName: string, target: number, duration: number): void {
    const increment = target / (duration / 16); // Adjust increment based on the desired duration
    const interval = setInterval(() => {
      if (this[propertyName] < target) {
        this[propertyName] = Math.min(this[propertyName] + increment, target);
      } else {
        clearInterval(interval);
      }
    }, 16); // 16 ms for a smoother animation (~60 frames per second)
  }

  

    hideErrorMessageAfterDelay() {
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }


    @ViewChild('homeSection') homeSection!: ElementRef;
  @ViewChild('loginSection') loginSection!: ElementRef;
  @ViewChild('usersSection') usersSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;

  scrollTo(section: string): void {
    switch (section) {
      case 'home':
        this.homeSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'login':
        this.loginSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'users':
        this.usersSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        this.contactSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
  


}
