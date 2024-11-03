export class Enseignant {
    id: number; // Assurez-vous que cela correspond au type du backend (int en Java)
    firstName: string;
    lastName: string;
    email: string;
    username: string; // Nouveau champ username
    password: string; // Si nécessaire, mais généralement à ne pas exposer
    phone: string;
    specialite: string; // Champ supplémentaire spécifique à l'Enseignant

   
}
