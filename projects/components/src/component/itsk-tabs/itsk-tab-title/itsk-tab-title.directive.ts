import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[itskTabTitle]'})
export class ItskTabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
