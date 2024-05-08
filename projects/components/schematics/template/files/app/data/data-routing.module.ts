import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataLayoutComponent } from './data-layout/data-layout.component';

const routes: Routes = [
  {
    path: 'data',
    component: DataLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DataRoutingModule {}
