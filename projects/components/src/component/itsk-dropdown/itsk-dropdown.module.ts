import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskDropdownComponent} from './itsk-dropdown/itsk-dropdown.component';
import {ItskDropdownHeadDirective} from './itsk-dropdown-head.directive';
import {ItskDropdownContentDirective} from './itsk-dropdown-content.directive';

@NgModule({
  declarations: [
    ItskDropdownComponent,
    // ItskDropdownHeadComponent,
    // ItskDropdownContentComponent,
    ItskDropdownHeadDirective,
    ItskDropdownContentDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ItskDropdownComponent,
    ItskDropdownHeadDirective,
    ItskDropdownContentDirective
  ]
})
export class ItskDropdownModule {
}
