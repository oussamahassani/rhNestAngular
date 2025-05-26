import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importer FormsModule
import { ShowDemandeComponent } from './show-demande/show-demande.component';



@NgModule({
  declarations: [
    ShowDemandeComponent
      // Assurez-vous que le composant est déclaré ici
  ],
  imports: [
    CommonModule,   // Import de CommonModule
    FormsModule   // Import de FormsModule pour pouvoir utiliser ngModel
  ],

})
export class DemandesModule { }  // Ou le nom de votre module spécifique
