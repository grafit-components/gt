import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[itskDropdownHead]',
})
export class ItskDropdownHeadDirective {
  constructor(public template: TemplateRef<any>) {}
}
