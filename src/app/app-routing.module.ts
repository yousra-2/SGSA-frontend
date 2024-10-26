import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { EtudiantDashboardComponent } from './Components/etudiant-dashboard/etudiant-dashboard.component';
import { EnseignantDashboardComponent } from './Components/enseignant-dashboard/enseignant-dashboard.component';
import { DirecteurDashboardComponent } from './Components/directeur-dashboard/directeur-dashboard.component';
import { EtudiantNotesComponent } from './Components/etudiant-notes/etudiant-notes.component';
import { EtudiantAttestationComponent } from './Components/etudiant-attestation/etudiant-attestation.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'etudiant-dashboard', component:EtudiantDashboardComponent },
  { path: 'enseignant-dashboard', component:EnseignantDashboardComponent },
  { path: 'directeur-dashboard', component:DirecteurDashboardComponent },
  { path: 'etuNotes', component:EtudiantNotesComponent },
  { path: 'etuAttest', component:EtudiantAttestationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
