import {Directive, HostBinding, Input} from '@angular/core';
import {ItskTreeControl} from './model/itsk-tree-control';

@Directive({
  selector: '[itskTreeToggle]'
})
export class ItskTreeToggleDirective {
  @Input() itskTreeToggleChildren: boolean = false;

  @Input() itskTreeControl?: ItskTreeControl;

  @HostBinding('class.tree__toggle') treeToggle = true;

  constructor() {
  }
}
