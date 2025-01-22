import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskDropdownContent]',
    standalone: false
})
export class ItskDropdownContentDirective {
  constructor(public template: TemplateRef<any>) {}
}
