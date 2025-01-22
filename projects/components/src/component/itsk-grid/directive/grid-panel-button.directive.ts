import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskGridPanelButton]',
    standalone: false
})
export class GridPanelButtonDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
