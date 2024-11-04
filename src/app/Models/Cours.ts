// export interface Cours {
//     id: number;
//     nom: string;
//     contenu?: string; // Peut être représenté sous forme de base64 ou d'URL
//     matiereId: number; // ID de la matière associée au cours
//   }
//   // Models/Cours.ts
export interface Cours {
    id: number;           // Identifiant du cours
    nom: string;         // Nom du cours
    contenuUrl?: string; // URL pour le contenu, optionnelle
    matiereId: number;   // L'identifiant de la matière à laquelle appartient le cours
  }
  