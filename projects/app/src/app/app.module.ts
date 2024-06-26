import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ItskMenuModule } from '@grafit/components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

@NgModule({
  declarations: [AppComponent, FirstComponent, SecondComponent],
  imports: [ItskMenuModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
