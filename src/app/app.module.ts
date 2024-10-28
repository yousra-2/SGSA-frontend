import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';


import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { EtudiantDashboardComponent } from './Components/etudiant-dashboard/etudiant-dashboard.component';
import { EnseignantDashboardComponent } from './Components/enseignant-dashboard/enseignant-dashboard.component';
import { DirecteurDashboardComponent } from './Components/directeur-dashboard/directeur-dashboard.component';
import { EtudiantNotesComponent } from './Components/etudiant-notes/etudiant-notes.component';
import { EtudiantAttestationComponent } from './Components/etudiant-attestation/etudiant-attestation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantDashboardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
