import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskGridCustomPanel]',
    standalone: false
})
export class GridCustomPanelDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
