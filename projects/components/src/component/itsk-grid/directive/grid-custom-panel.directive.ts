import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[itskGridCustomPanel]',
})
export class GridCustomPanelDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
