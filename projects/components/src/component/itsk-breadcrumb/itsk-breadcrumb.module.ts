import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskBreadcrumbComponent} from './itsk-breadcrumb/itsk-breadcrumb.component';
import {ItskClickOutsideModule} from '../../directive/itsk-click-outside/itsk-click-outside.module';
import {RouterModule} from '@angular/router';
import {ItskIconModule} from '../itsk-icon/itsk-icon.module';
import {ItskSharedModule} from '../itsk-shared/itsk-shared.module';
import {ItskDropdownModule} from '../itsk-dropdown/itsk-dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ItskIconModule,
    ItskDropdownModule
  ],
  declarations: [
    ItskBreadcrumbComponent
  ],
  exports: [
    ItskBreadcrumbComponent
  ]
})
export class ItskBreadcrumbModule {
}
