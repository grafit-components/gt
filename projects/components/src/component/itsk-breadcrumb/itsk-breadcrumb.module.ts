import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItskDropdownModule } from '../itsk-dropdown/itsk-dropdown.module';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskBreadcrumbComponent } from './itsk-breadcrumb/itsk-breadcrumb.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  imports: [CommonModule, RouterModule, ItskIconModule, ItskDropdownModule, ItskBreadcrumbComponent],
  exports: [ItskBreadcrumbComponent],
})
export class ItskBreadcrumbModule {}
