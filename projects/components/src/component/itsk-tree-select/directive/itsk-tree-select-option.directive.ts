import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[itskTreeSelectOption]'
})
export class ItskTreeSelectOptionDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
