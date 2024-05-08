import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItskDropdownModule } from '../itsk-dropdown/itsk-dropdown.module';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskBreadcrumbComponent } from './itsk-breadcrumb/itsk-breadcrumb.component';

@NgModule({
  imports: [CommonModule, RouterModule, ItskIconModule, ItskDropdownModule],
  declarations: [ItskBreadcrumbComponent],
  exports: [ItskBreadcrumbComponent],
})
export class ItskBreadcrumbModule {}
