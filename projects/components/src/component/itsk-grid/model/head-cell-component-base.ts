import {GridColumn} from './grid-column';
import { HostBinding, Directive } from '@angular/core';

@Directive()
export abstract class HeadCellComponentBase {
  @HostBinding('class.grid__head__cell__component')

  abstract column: GridColumn;
  abstract sorted: boolean;
  abstract filtered: boolean;
  abstract asc: boolean;
}
