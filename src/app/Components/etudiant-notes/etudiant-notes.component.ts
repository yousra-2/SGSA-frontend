import { Component } from '@angular/core';
import { EtudiantService } from '../../Services/etudiant.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-etudiant-notes',
  templateUrl: './etudiant-notes.component.html',
  styleUrl: './etudiant-notes.component.css'
})
export class EtudiantNotesComponent {

  notes: any[] = [];
  id_etudiant: number;

  constructor(private apiEtudiantService: EtudiantService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // this.getIdEtudiantFromToken(); // Récupérer l'ID de l'étudiant au démarrage
    // if (this.id_etudiant) {
    //   this.afficherNotes(); // Appeler la méthode pour afficher les notes
    // }
    if (typeof window !== 'undefined') {
      // Accéder à localStorage
      const token = this.localStorageService.get('token');
      console.log(token);
      const decoded: any = jwtDecode(token);
      console.log(decoded.id);
      this.id_etudiant = decoded.id;
      this.afficherNotes();
    }
  }

  // getIdEtudiantFromToken(): void {
  //   const token = this.localStorageService.get('token'); // Récupérer le token via le service
  //   if (token) {
  //     const decoded: any = jwtDecode(token); // Décodage du token
  //     this.id_etudiant = decoded.id; // Extraire l'ID de l'étudiant (clé "id")
  //     console.log("id etudiant : "+this.id_etudiant);
  //   }
  // }

  afficherNotes(): void {
    if (this.id_etudiant) {
      this.apiEtudiantService.AfficherNotes(this.id_etudiant).subscribe(
        response => {
          console.log(response);
          // Adapter ici pour récupérer les données
          this.notes = response.map(note => ({
            valeur: note.moyenneNote, // Valeur de la note
            moduleNom: note.moduleNom     // Ajoutez ici le nom du module
          }));
        },
        error => {
          console.error('Erreur lors de la récupération des notes:', error);
          if (error.status === 401) {
            alert('Erreur 401 : Non autorisé - Vérifiez le token ou les permissions.');
          }
        }
      );
    }
  }
}
