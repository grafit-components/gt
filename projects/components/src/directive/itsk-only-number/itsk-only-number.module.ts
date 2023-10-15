import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskOnlyNumberDirective} from './itsk-only-number.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItskOnlyNumberDirective],
  exports: [ItskOnlyNumberDirective]
})
export class ItskOnlyNumberModule {
}
