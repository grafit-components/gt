import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { DOCS } from './docs';
import { FirstComponent } from './first/first.component';
import { FormComponent } from './samples/form/form.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OverviewPageComponent,
  },
  ...DOCS.map(({ path, component }) => ({ path, component })),
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
