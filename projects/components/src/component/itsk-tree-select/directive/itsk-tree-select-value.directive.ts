import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskTreeSelectValue]',
    standalone: false
})
export class ItskTreeSelectValueDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
