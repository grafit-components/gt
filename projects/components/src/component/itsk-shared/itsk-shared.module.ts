import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskTemplateDirective} from './itsk-template.directive';
import {ItskMarkDirective} from './itsk-mark.directive';

@NgModule({
  declarations: [
    ItskMarkDirective,
    ItskTemplateDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ItskMarkDirective,
    ItskTemplateDirective
  ]
})
export class ItskSharedModule {
}
