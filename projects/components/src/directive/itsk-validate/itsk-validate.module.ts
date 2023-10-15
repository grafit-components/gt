import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskValidateDirective} from './itsk-validate.directive';
import {ItskValidateGroupDirective} from './itsk-validate-group.directive';

@NgModule({
  declarations: [
    ItskValidateDirective,
    ItskValidateGroupDirective],
  exports: [
    ItskValidateDirective,
    ItskValidateGroupDirective],
  imports: [
    CommonModule
  ]
})
export class ItskValidateModule {
}
