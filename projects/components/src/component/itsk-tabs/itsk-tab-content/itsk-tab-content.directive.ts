import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[itskTabContent]' })
export class ItskTabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
