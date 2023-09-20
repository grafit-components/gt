import { Input, Directive } from '@angular/core';
import {GridRow, IId} from './grid-row';
import {GridColumn} from './grid-column';

@Directive()
export class GroupRowComponentBase<T extends IId> {
  @Input() row: GridRow<T>;
  @Input() columns: GridColumn[];
}
