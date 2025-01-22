import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskTabTitle]',
    standalone: false
})
export class ItskTabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
