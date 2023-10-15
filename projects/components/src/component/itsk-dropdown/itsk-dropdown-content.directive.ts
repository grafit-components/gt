import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[itskDropdownContent]'
})
export class ItskDropdownContentDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
