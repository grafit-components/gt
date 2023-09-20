import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {GridRow, IId} from '../../model/grid-row';
import {GridBodyBase} from '../../model/grid-body-base';
import {ItskGridService} from '../../service/itsk-grid.service';

@Component({
  selector: 'itsk-grid-body',
  templateUrl: './itsk-grid-body.component.html',
  styleUrls: ['./itsk-grid-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridBodyComponent<T extends IId> extends GridBodyBase<T> {
  @Input() virtual: boolean;

  constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  selectGroup(row: GridRow<T>, value: boolean) {
    this.svc$.selectGroup(row, value);
  }

  isGroupSelected(row: GridRow<T>) {
    return this.svc$.isGroupSelected(row);
  }
}
