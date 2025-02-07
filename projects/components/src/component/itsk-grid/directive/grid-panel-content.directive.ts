import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[itskGridPanelContent]' })
export class GridPanelContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
