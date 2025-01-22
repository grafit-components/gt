import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskSelectValue]',
    standalone: false
})
export class ItskSelectValueDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
