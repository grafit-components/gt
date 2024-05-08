import { Directive, Input } from '@angular/core';
import { GridColumn } from './grid-column';
import { GridRow, IId } from './grid-row';

@Directive()
export class GroupRowComponentBase<T extends IId> {
  @Input() row?: GridRow<T>;
  @Input() columns?: GridColumn[];
}
