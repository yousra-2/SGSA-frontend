import { Etudiant } from "./Etudiant";
import { Enseignant } from "./Enseignant";

export class ProjetAcademique {
    id: number;
    titre: string;
    type: string; // 'PFA' ou 'PFE'
    dateUniversitaire: string;
    enseignant: Enseignant; // Utiliser l'objet Enseignant
    etudiant: Etudiant;// Utilisez l'ID pour les relations, peut être facultatif
    statut: string; // 'AFFECTE' ou 'EN_COURS'
    sujet: string;
    societe: string;
    datedebut: Date;
    datefin: Date;
    constructor() {
        this.enseignant = new Enseignant(); // Initialiser pour éviter les erreurs
        this.etudiant = new Etudiant(); // Initialiser pour éviter les erreurs
    }
}

