import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../Services/etudiant.service';
import { ProjetAcademique } from '../../Models/ProjetAcadimique';
import { LocalStorageService } from '../../Services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Enseignant } from '../../Models/Enseignant';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {
  projets: ProjetAcademique[] = [];
  nouveauProjet: ProjetAcademique = new ProjetAcademique();
  showModal: boolean = false;
  confirmationMessage: string = '';
  errorMessage: string = '';
  enseignants: Enseignant[] = [];

  constructor(
    private etudiantService: EtudiantService, 
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadProjets();
    // this.setStudentIdFromToken(); // Automatically set the student ID
    this.etudiantService. getAllEnseignants().subscribe(
      data => {
        this.enseignants = data;
      },
      error => {
        console.error("Erreur lors de la récupération des enseignants", error);
      }
    );
  }

  loadProjets(): void {
    if (typeof window !== 'undefined') {
      const token = this.localStorageService.get('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        const id_etudiant = decoded.id;
        this.etudiantService.getProjetsByEtudiantId(id_etudiant).subscribe(data => {
          this.projets = data;
        });
      }
    }
  }

  ouvrirModal(): void {
    this.showModal = true;
    this.nouveauProjet = new ProjetAcademique();
    this.nouveauProjet.statut = "EN_COURS"; // Set default status to "EN_COURS"
  }
  
  fermerModal(): void {
    this.showModal = false;
    this.confirmationMessage = '';
    this.errorMessage = '';
  }
  loadEnseignants(): void {
    this.etudiantService.getAllEnseignants().subscribe(data => {
      this.enseignants = data;
    });
  }

  onSubmit(): void {
    console.log('Soumission du formulaire', this.nouveauProjet);
    console.log('Nouveau Projet:', this.nouveauProjet);
    const token = this.localStorageService.get('token');
if (token) {
  const decoded: any = jwtDecode(token);
  this.nouveauProjet.etudiant.id = decoded.id;
    this.etudiantService.addProject(this.nouveauProjet).subscribe(
      (response: Blob) => {
        console.log('Réponse reçue', response);
        const blobUrl = URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'convention.pdf'; // Nom du fichier à télécharger
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.confirmationMessage = "Projet ajouté avec succès et convention générée.";
        this.loadProjets(); // Rafraîchir la liste des projets
        this.fermerModal();
      },
      error => {
        this.errorMessage = "Erreur lors de l'ajout du projet.";
        console.error("Erreur:", error);
      }
    );
  }
  

}}
