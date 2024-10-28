import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { EtudiantDashboardComponent } from './etudiant-dashboard/etudiant-dashboard.component';
import { EnseignantDashboardComponent } from './Components/enseignant-dashboard/enseignant-dashboard.component';
// import { DirecteurDashboardComponent } from './directeur-dashboard/directeur-dashboard.component';
import { ManageCoursesComponent } from './Components/manage-courses/manage-courses.component'; 
import { ManageStudentsComponent } from './Components/manage-students/manage-students.component'; 
import { ManageSubjectComponent } from './Components/manage-subject/manage-subject.component';
import { AcademicProjectsComponent } from './Components/academic-projects/academic-projects.component';

import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { AppComponent } from './app.component';

// Déclaration du tableau de routes
export const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'etudiant/dashboard', component: EtudiantDashboardComponent },
  { path: 'enseignant/dashboard', component: EnseignantDashboardComponent },
  // { path: 'directeur/dashboard', component: DirecteurDashboardComponent },
  { path: 'manage-courses/:matiereId', component: ManageCoursesComponent },
  { path: 'manage-students/:matiereId', component: ManageStudentsComponent }, // Route pour gérer les étudiants
  { path: 'manage-subject/:matiereId', component: ManageSubjectComponent }, 
  { path: 'academic-projects/:enseignantId', component: AcademicProjectsComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }  // Optionnel : Redirigez les routes inconnues vers la page d'accueil

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
