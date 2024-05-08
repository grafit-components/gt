import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[itskMenuItem]',
})
export class ItskMenuItemDirective {
  constructor(public _template: TemplateRef<any>) {}
}
