import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[itskTreeSelectValue]',
})
export class ItskTreeSelectValueDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
