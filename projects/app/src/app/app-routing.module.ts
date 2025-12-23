import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconsPageComponent } from './components/icons-page/icons-page.component';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
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
    path: 'select',
    component: SelectPageComponent,
  },
  {
    path: 'third',
    component: FormComponent,
  },
  {
    path: 'notifications',
    component: NotificationsPageComponent,
  },
  {
    path: 'icons',
    component: IconsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
