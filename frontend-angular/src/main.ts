import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      NgxSpinnerModule.forRoot() // If you're using ngx-spinner
    ),
    provideAnimations(),
    provideHttpClient(), // Add HTTP client
    provideToastr() // Add Toastr notifications
    // Add other providers here as needed
  ]
}).catch((err) => console.error(err));
