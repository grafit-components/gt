import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModule } from './data/data.module';
import { FormModule } from './form/form.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [DataModule, FormModule, RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
