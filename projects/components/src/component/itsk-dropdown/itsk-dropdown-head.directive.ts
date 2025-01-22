import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskDropdownHead]',
    standalone: false
})
export class ItskDropdownHeadDirective {
  constructor(public template: TemplateRef<any>) {}
}
