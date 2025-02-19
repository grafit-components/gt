import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectPageComponent } from './components/select-page/select-page.component';
import { FirstComponent } from './first/first.component';
import { FormComponent } from './samples/form/form.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
  {
    path: 'first',
    component: FirstComponent,
  },
  {
    path: 'second',
    component: SecondComponent,
  },
  {
    path: 'third',
    component: FormComponent,
  },
  {
    path: 'select',
    component: SelectPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
