import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskMenuComponent} from './itsk-menu/itsk-menu.component';
import {ItskClickOutsideModule} from '../../directive/itsk-click-outside/itsk-click-outside.module';
import {RouterModule} from '@angular/router';
import {ItskMenuItemComponent} from './itsk-menu-item/itsk-menu-item.component';
import {ItskMenuItemDirective} from './itsk-menu-item.directive';
import {ItskMenuButtonComponent} from './itsk-menu-button/itsk-menu-button.component';
import { ItskMenuItemsComponent } from './itsk-menu-items/itsk-menu-items.component';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ItskClickOutsideModule,
    ItskIconModule
  ],
  declarations: [
    ItskMenuComponent,
    ItskMenuItemComponent,
    ItskMenuItemDirective,
    ItskMenuButtonComponent,
    ItskMenuItemsComponent
  ],
  exports: [
    ItskMenuComponent,
    ItskMenuItemComponent,
    ItskMenuItemDirective,
    ItskMenuButtonComponent
  ],
})
export class ItskMenuModule {
}
