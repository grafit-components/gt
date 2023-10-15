import {NgModule} from '@angular/core';
import {FormComponent} from './form/form.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
  path: 'form',
  component: FormComponent
}]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FormRoutingModule {
}
