import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DemandesModule } from './demo/pages/Demandes/demandes.module';

@NgModule({
  declarations: [
    AppComponent  // Déclarez votre composant principal ici
  ],
  imports: [
    BrowserModule,  // Nécessaire pour une application Angular
    DemandesModule    // Ajoutez ici le module où est déclaré ShowDemandeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]  // Ce composant est le point d'entrée
})
export class AppModule {}
