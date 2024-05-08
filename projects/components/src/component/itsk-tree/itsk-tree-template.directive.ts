import { Directive, Input, TemplateRef } from '@angular/core';
import { AnyObject } from '../itsk-shared/any-object';
import { ItskTreeControl } from './model/itsk-tree-control';

@Directive({
  selector: '[itskTreeTemplate]',
})
export class ItskTreeTemplateDirective {
  @Input() type?: string;
  @Input('itskTreeTemplate') name?: string;

  constructor(public template: TemplateRef<{ $implicit: AnyObject; control: ItskTreeControl; index: number }>) {}
}
