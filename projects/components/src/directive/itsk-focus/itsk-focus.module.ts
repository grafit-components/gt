import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskFocusDirective} from './itsk-focus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItskFocusDirective],
  exports: [ItskFocusDirective]
})
export class ItskFocusModule {
}
