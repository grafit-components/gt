import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[itskGridPanelButton]'
})
export class GridPanelButtonDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
