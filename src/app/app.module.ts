import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Importez tous vos composants
import { LoginComponent } from './Components/login/login.component';
import { EtudiantDashboardComponent } from './Components/etudiant-dashboard/etudiant-dashboard.component';
import { EnseignantDashboardComponent } from './Components/enseignant-dashboard/enseignant-dashboard.component';
import { DirecteurDashboardComponent } from './Components/directeur-dashboard/directeur-dashboard.component';
import { EtudiantNotesComponent } from './Components/etudiant-notes/etudiant-notes.component';
import { EtudiantAttestationComponent } from './Components/etudiant-attestation/etudiant-attestation.component';
import { AjouterEnseignantComponent } from './Components/directeur-dashboard/ajouter-enseignant.component'; // Correct
import { ModifierEnseignantComponent } from './Components/directeur-dashboard/modifier-enseignant.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { ModuleComponent } from './Components/module/module.component';
import { FormationComponent } from './Components/formation/formation.component';
// Assurez-vous d'importer ce composant
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantDashboardComponent,
    
    // EnseignantDashboardComponent,
    DirecteurDashboardComponent,
    EtudiantNotesComponent,
    EtudiantAttestationComponent,
    AjouterEnseignantComponent, // Ajoutez ici le composant AjouterEnseignant
    ModifierEnseignantComponent, DashboardComponent, ModuleComponent  // Ajoutez ici le composant ModifierEnseignant
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
