import { Component, OnInit } from '@angular/core';
import { Matiere } from '../../Models/Matiere';
import { EtudiantService } from '../../Services/etudiant.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Cours } from '../../Models/Cours';

@Component({
  selector: 'app-matiere-component',
  templateUrl: './matiere-component.component.html',
  styleUrls: ['./matiere-component.component.css'] 
})
export class MatiereComponentComponent implements OnInit {

  matieres: Matiere[] = [];
  cours: { [matiereId: number]: Cours[] } = {}; 

  constructor(
    private etudiantService: EtudiantService, 
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getMatieres();
  }

  getMatieres(): void {
    const token = this.localStorageService.get('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const id_etudiant = decoded.id;

      this.etudiantService.getMatieresByEtudiantId(id_etudiant).subscribe(
        (data: Matiere[]) => {
          this.matieres = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des matières', error);
        }
      );
    }
  }

  getCoursForMatiere(matiereId: number): void {
    this.etudiantService.getCoursByMatiereId(matiereId).subscribe(
      (data: any[]) => {
        console.log(data); // Vérifiez la structure de la réponse
        this.cours[matiereId] = data.map((item: any) => {
          console.log('Contenu du fichier:', item[2]); // Vérifiez ce qui est dans item[2]
  
          // Vérifiez si item[2] est un tableau d'octets
          let contenuUrl: string | undefined;
          if (item[2]) {
            if (typeof item[2] === 'string') {
              // Si c'est une chaîne, assurez-vous que c'est du Base64 et convertissez
              const byteCharacters = atob(item[2]);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              contenuUrl = URL.createObjectURL(new Blob([byteArray], { type: 'application/pdf' }));
            } else {
              // Si c'est déjà un tableau d'octets
              contenuUrl = URL.createObjectURL(new Blob([item[2]], { type: 'application/pdf' }));
            }
          }
  
          return {
            id: item[0], // ID du cours
            nom: item[1], // Nom du cours
            contenuUrl: contenuUrl, // URL pour le contenu
            matiereId: matiereId // Lien vers la matière
          };
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  }
  
  
}
