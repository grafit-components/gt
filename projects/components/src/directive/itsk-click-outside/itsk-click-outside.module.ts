import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskClickOutsideDirective} from './itsk-click-outside.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItskClickOutsideDirective],
  exports: [ItskClickOutsideDirective]
})
export class ItskClickOutsideModule {
}
