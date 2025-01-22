import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskTabContent]',
    standalone: false
})
export class ItskTabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
