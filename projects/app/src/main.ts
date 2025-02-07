import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { ItskMenuModule } from '@grafit/components';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(ItskMenuModule, BrowserModule, AppRoutingModule)]
})
  .catch((err) => console.error(err));
