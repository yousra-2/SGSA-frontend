import { Component } from '@angular/core';
import { LocalStorageService } from '../../Services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { EtudiantService } from '../../Services/etudiant.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-attestation',
  templateUrl: './etudiant-attestation.component.html',
  styleUrl: './etudiant-attestation.component.css'
})
export class EtudiantAttestationComponent {

  id_etudiant: number;

  constructor(private apiEtudiantService: EtudiantService,private localStorageService: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Accéder à localStorage
      const token = this.localStorageService.get('token');
      console.log(token);
      const decoded: any = jwtDecode(token);
      console.log(decoded.id);
      this.id_etudiant = decoded.id;
      this.Attestation();
    }
  }    


  Attestation(): void {
    this.apiEtudiantService.VoirAttestation(this.id_etudiant).subscribe(
      (response: Blob) => {
        // Créer un URL d'objet pour ouvrir le PDF
        const url = window.URL.createObjectURL(response);
        window.open(url, '_blank');

        // Redirection vers le tableau de bord après 3 secondes
        setTimeout(() => {
          this.router.navigate(['/etudiant-dashboard']); 
        }, 3000); // 3000 millisecondes = 3 secondes
      },
      error => {
        console.error('Erreur lors de la récupération de l\'attestation:', error);
        if (error.status === 401) {
          alert('Erreur 401 : Non autorisé - Vérifiez le token ou les permissions.');
        }
      }
    );
  }
}
