import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskMenuItem]',
    standalone: false
})
export class ItskMenuItemDirective {
  constructor(public _template: TemplateRef<any>) {}
}
