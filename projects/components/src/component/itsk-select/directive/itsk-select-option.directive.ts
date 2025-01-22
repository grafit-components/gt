import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskSelectOption]',
    standalone: false
})
export class ItskSelectOptionDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
