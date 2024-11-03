
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Ajout du module FormsModule

interface Course {
  id: number;
  nom: string;
  contenu: string; // Ajout de la propriété contenu
  pdfUrl: string; // Pour stocker l'URL du fichier PDF
}

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
  standalone: true,
  imports: [
    CommonModule,  // Nécessaire pour les directives Angular de base
    FormsModule    // Nécessaire pour ngModel
  ]

})
export class ManageCoursesComponent implements OnInit {
  matiereId!: number;
  courses: Course[] = [];
  errorMessage: string = '';
  showForm: boolean = false; // Property to control form visibility
  toggleForm(): void {
    this.showForm = !this.showForm; // Toggle the form's visibility
  }
  viewStudents(): void {
    // Implement logic to navigate to student listing or show student list
    this.router.navigate(['/manage-students', this.matiereId]);
    //  <a [routerLink]="['/manage-students', matiereId]">Gérer Étudiants</a>
    console.log('Navigating to student list...');
  }
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matiereId = +params['matiereId'];
      this.loadCourses();
    });
  }
  loadCourses(): void {
    const token = localStorage.getItem('token');
  
    if (!token) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      setTimeout(() => this.router.navigate(['/login']), 1000);
      return;
    }
  
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `http://localhost:8085/matieres/${this.matiereId}/cours`;
  
    this.http.get<any[]>(url, { headers }).subscribe(
      (data) => {
        console.log('Données reçues:', data);
        if (Array.isArray(data)) {
          this.courses = data.map((courseArray, index) => {
            console.log('Course:', courseArray);
            
            // Vérifiez que le tableau a au moins 2 éléments
            if (courseArray.length >= 2) {
              const idcour = courseArray[0];
              // const base64Content = courseArray[1];
              const courseName = courseArray[1];
              const base64Content = courseArray[2];
  
              // Conversion du contenu Base64 en Blob
              const byteCharacters = atob(base64Content);
              const byteNumbers = new Uint8Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const blob = new Blob([byteNumbers], { type: 'application/pdf' }); // Créez le Blob à partir du tableau d'octets
  
              return {
                id: idcour, // Utilisez l'index comme ID temporaire ou récupérez l'ID depuis l'API si disponible
                nom: courseName,
                contenu: base64Content, // Gardez le contenu original au cas où
                pdfUrl: URL.createObjectURL(blob) // Créez l'URL du Blob
              } as Course; // Assurez-vous que c'est du type Course
            } else {
              console.warn('Format de cours invalide:', courseArray);
              return null; // Ou gérer les cas où le format est incorrect
            }
          }).filter(course => course !== null) as Course[]; // Filtrer les éléments null et indiquer que c'est un tableau de Course
        } else {
          console.warn('Les données reçues ne sont pas un tableau:', data);
        }
      },
      (error) => {
        console.error('', error);
        this.handleError(error);
      }
    );
  }
  
  newCourse: { nom: string; contenu?: Blob } = { nom: '' };

  

  private handleError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 
        '' + 
        ('');
    }
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.newCourse.contenu = input.files[0];
    }
  }

  addCourse(): void {
    const formData = new FormData();
    formData.append('nom', this.newCourse.nom);
    if (this.newCourse.contenu) {
      formData.append('contenu', this.newCourse.contenu); // Ajouter le fichier PDF
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      setTimeout(() => this.router.navigate(['/login']), 1000);
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}` };

    const url = `http://localhost:8085/matieres/${this.matiereId}/cours`;
    this.http.post(url, formData, { headers }).subscribe(
      (response) => {
        console.log('Cours ajouté avec succès:', response);
        this.loadCourses(); // Recharger la liste des cours
        this.newCourse = { nom: '', contenu: undefined }; // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du cours:', error);
        window.location.reload();
      }
    );
  }


  deleteCourse(courseId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      setTimeout(() => this.router.navigate(['/login']), 1000);
      return;
    }
  
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `http://localhost:8085/matieres/${this.matiereId}/cours/${courseId}`;
  
    this.http.delete(url, { headers }).subscribe(
      () => {
        console.log(`Cours avec l'ID ${courseId} supprimé avec succès.`);
        this.courses = this.courses.filter(course => course.id !== courseId); // Mise à jour locale de la liste
      },
      (error) => {
        console.error('Erreur lors de la suppression du cours:', error);
        window.location.reload();
      }
    );
  }
  
 
  
 
}

