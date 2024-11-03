import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../Services/etudiant.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Etudiant } from '../../Models/Etudiant';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  etudiant: Etudiant | null = null;

  constructor(private etudiantService: EtudiantService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = this.localStorageService.get('token');
      const decoded: any = jwtDecode(token);
      const id_etudiant = decoded.id;

      this.etudiantService.getProfil(id_etudiant).subscribe(
        (data: Etudiant) => {
          this.etudiant = data;
        },
        error => {
          console.error("Erreur lors du chargement du profil:", error);
        }
      );
    }
  }
}
