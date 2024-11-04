import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { EtudiantDashboardComponent } from './Components/etudiant-dashboard/etudiant-dashboard.component';
import { EnseignantDashboardComponent } from './Components/enseignant-dashboard/enseignant-dashboard.component';
import { DirecteurDashboardComponent } from './Components/directeur-dashboard/directeur-dashboard.component';
import { EtudiantNotesComponent } from './Components/etudiant-notes/etudiant-notes.component';
import { EtudiantAttestationComponent } from './Components/etudiant-attestation/etudiant-attestation.component';
import { ManageCoursesComponent } from './Components/manage-courses/manage-courses.component'; 
import { ManageStudentsComponent } from './Components/manage-students/manage-students.component'; 
import { ManageSubjectComponent } from './Components/manage-subject/manage-subject.component';
import { AcademicProjectsComponent } from './Components/academic-projects/academic-projects.component';
import { AjouterEnseignantComponent } from './Components/directeur-dashboard/ajouter-enseignant.component'; // Correct
import { ModifierEnseignantComponent } from './Components/directeur-dashboard/modifier-enseignant.component'; 
import { DashboardComponent } from './Components/dashboard/dashboard.component';// Correct
import { ModuleComponent } from './Components/module/module.component';// Correct
import { FormationComponent } from './Components/formation/formation.component'; // Importez le composant
import { ProfilComponent } from './Components/profil/profil.component'; 
import { StagesComponent } from './Components/stages/stages.component'; 
import { EtugestionComponent } from './Components/etugestion/etugestion.component';
import { CoursComponent } from './Components/cours/cours.component';
import { MatiereComponentComponent } from './Components/matiere-component/matiere-component.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'etudiant-dashboard', component: EtudiantDashboardComponent },
  { path: 'enseignant-dashboard', component: EnseignantDashboardComponent },
  { path: 'directeur-dashboard', component: DirecteurDashboardComponent },
  { path: 'etuNotes', component: EtudiantNotesComponent },
  { path: 'etuAttest', component: EtudiantAttestationComponent },
  { path: 'etugestion', component: EtugestionComponent },
  { path: 'manage-courses/:matiereId', component: ManageCoursesComponent },
  { path: 'manage-students/:matiereId', component: ManageStudentsComponent },
  { path: 'manage-subject/:matiereId', component: ManageSubjectComponent },
  { path: 'academic-projects/:enseignantId', component: AcademicProjectsComponent },
  { path: 'ajouter-enseignant', component: AjouterEnseignantComponent }, // Nouvelle route pour ajouter enseignant
  { path: 'modifier-enseignant/:id', component: ModifierEnseignantComponent },
  { path: 'dashboard', component: DashboardComponent }, // Nouvelle route pour modifier enseignant
  { path: 'module', component: ModuleComponent }, // Nouvelle route pour modifier enseignant
  { path: 'formation', component: FormationComponent },
 { path: 'profil', component:ProfilComponent },
 { path: 'stages', component:StagesComponent },
 { path: 'cours', component:CoursComponent },
 { path: 'matiers', component:MatiereComponentComponent },
 
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirection vers la page de connexion

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
