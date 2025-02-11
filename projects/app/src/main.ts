import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ItskMenuModule } from '@grafit/components';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(ItskMenuModule, BrowserModule, AppRoutingModule), provideHttpClient()],
}).catch((err) => console.error(err));
