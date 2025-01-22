import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[itskGridPanelContent]',
    standalone: false
})
export class GridPanelContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
