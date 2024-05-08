import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[itskSelectValue]',
})
export class ItskSelectValueDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
