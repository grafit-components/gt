import {NgModule} from '@angular/core';
import {DataLayoutComponent} from "./data-layout/data-layout.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
  path: 'data',
  component: DataLayoutComponent
}]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DataRoutingModule {
}
