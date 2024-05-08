import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[itskSelectOption]',
})
export class ItskSelectOptionDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
