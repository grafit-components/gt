import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskTreeSelectOption]',
    standalone: false
})
export class ItskTreeSelectOptionDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
