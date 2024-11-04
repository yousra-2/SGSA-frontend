import { Component } from '@angular/core';
import { DirecteurService } from '../../Services/directeur.service';
import { Etudiant } from '../../Models/Etudiant';
import { Formation } from '../../Models/Formation';

@Component({
  selector: 'app-etugestion',
  templateUrl: './etugestion.component.html',
  styleUrl: './etugestion.component.css'
})
export class EtugestionComponent {

  etudiant: Etudiant = new Etudiant();
  etudiants: Etudiant[] = [];
  paginatedEtudiants: Etudiant[] = []; // Subset of students for the current page
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of students to display per page
  

  showModal: boolean = false;


  isEditMode: boolean = false;
  confirmationMessage: String;
  ErrorMessage: String;
  confirmation: String;
  Error: String;
  errorMessageFormIncomplet: String;
  formations: Formation[] = [];

  constructor(private apidirecteur: DirecteurService) { }
  

  ngOnInit(): void {
    this.apidirecteur.AfficherEtudiants().subscribe(response => {
      console.log(response);
      this.etudiants = response;
      this.updatePaginatedEtudiants();
    });

    this.apidirecteur.getFormations().subscribe(data => {
      this.formations = data;
    });
  }

  // Update the displayed subset of students based on the current page
  updatePaginatedEtudiants(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEtudiants = this.etudiants.slice(start, end);
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.etudiants.length) {
      this.currentPage++;
      this.updatePaginatedEtudiants();
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEtudiants();
    }
  }

  ouvrirToAdd(): void {
    this.showModal = true;
    this.isEditMode = false; // Mode création
    this.etudiant = new Etudiant(); // Réinitialiser le formulaire
  
  }

  resetForm() {
    this.etudiant = new Etudiant();
  }
  fermer(): void {
    this.showModal = false;
    this.ngOnInit();
  }

  onSubmit() {
    if (this.isFormValid()) {

      if (this.isEditMode) {
        this.updateItineraire(); // Mise à jour de l'itinéraire existant
      }
      else {
      this.apidirecteur.AjouteEtudiant(this.etudiant).subscribe(response => {
        console.log(response);
        this.confirmationMessage = response.message;
        this.resetForm();
        this.ngOnInit();
        this.hideConfirmationMessageAfterDelay();
      }, error => {
        console.error(error);
        this.ErrorMessage = 'Erreur lors de la création de la demande';
        this.hideErrorMessageAfterDelay();
      });}
    } else {
      this.errorMessageFormIncomplet = 'Veuillez remplir tous les champs obligatoires.';
      this.hideErrorMessageFormIncompletAfterDelay();
    }
  }


updateItineraire(): void {

  this.apidirecteur.ModifierEtudiant(this.etudiant.id, this.etudiant).subscribe(response => {
    console.log("Updating student with ID:", this.etudiant.id);
    console.log(this.etudiant);
      this.confirmationMessage = response.message;
      this.ngOnInit(); 
      this.hideConfirmationMessageAfterDelay();
  }, error => {
      console.error(error);
      this.ErrorMessage = 'Erreur lors de la modification de l\'étudiant';
      this.hideErrorMessageAfterDelay();
  });
}
  

  supprimer(id_etudiant: number) {
    console.log(id_etudiant);
    if(confirm("Êtes-vous sûr de vouloir supprimer cet étudiant?")) {
      this.apidirecteur.SupprimerEtudiant(id_etudiant).subscribe(response => {
        console.log(response);
      this.confirmation = response.message; // Stocker le message de confirmation
      this.resetForm(); // Réinitialiser le formulaire // Réinitialiser le formulaire
      this.hideConfirmationMessageAfterDelay();
      this.ngOnInit();
      }, error => {
        console.error(error);
      this.Error = 'Erreur lors de la suppression de cet étudiant'; // Message d'erreur
      this.hideErrorMessageAfterDelay();
      });
    }
  }

  ouvrirModification(etudiant: Etudiant): void {
    this.showModal = true; // Afficher la fenêtre modale pour la modification.
    this.isEditMode = true;
    this.etudiant = { ...etudiant }; // Remplir le formulaire avec les données de l'étudiant à modifier
}

  
  


  hideConfirmationMessageAfterDelay() {
    setTimeout(() => {
      this.confirmationMessage = '';
      this.confirmation = '';
    }, 3000);
  }

  hideErrorMessageAfterDelay() {
    setTimeout(() => {
      this.ErrorMessage = '';
      this.Error = '';
    }, 3000);
  }
  hideErrorMessageFormIncompletAfterDelay() {
    setTimeout(() => {
      this.errorMessageFormIncomplet = '';
    }, 3000);
  }


  isFormValid(): boolean {
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const phonePattern = /^[0-9]+$/;
  
    let isValid = true;
  
    if (this.etudiant.firstName.trim() === '') {
      console.log("First Name is required");
      isValid = false;
    }
    if (this.etudiant.lastName.trim() === '') {
      console.log("Last Name is required");
      isValid = false;
    }
    // if (this.etudiant.email.trim() === '' || !emailPattern.test(this.etudiant.email)) {
      if (this.etudiant.email.trim() === '') {
      console.log("Valid Email is required");
      isValid = false;
    }
    if (this.etudiant.username.trim() === '') {
      console.log("Username is required");
      isValid = false;
    }
    if (this.etudiant.password.trim() === '') {
      console.log("Password is required");
      isValid = false;
    }
    // if (this.etudiant.phone.trim() === '' || !phonePattern.test(this.etudiant.phone)) {
      if (this.etudiant.phone.trim() === '') {
      console.log("Valid Phone Number is required");
      isValid = false;
    }
    if (this.etudiant.niveau_etude.trim() === '') {
      console.log("Niveau d'étude is required");
      isValid = false;
    }
    if (this.etudiant.code_appogee.trim() === '') {
      console.log("Code d'appogée is required");
      isValid = false;
    }
    if (!this.etudiant.date_inscription){
        console.log("Valid Date d'inscription is required");
      isValid = false;
    }
  
    return isValid;
  }
}
