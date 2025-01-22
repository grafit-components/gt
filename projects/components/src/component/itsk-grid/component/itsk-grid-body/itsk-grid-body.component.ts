import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { GridBodyBase } from '../../model/grid-body-base';
import { GridRow, IId } from '../../model/grid-row';
import { ItskGridService } from '../../service/itsk-grid.service';

@Component({
    selector: 'itsk-grid-body',
    templateUrl: './itsk-grid-body.component.html',
    styleUrls: ['./itsk-grid-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ItskGridBodyComponent<T extends IId> extends GridBodyBase<T> {
  @Input() virtual: boolean = false;

  constructor(svc$: ItskGridService<T>, cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  selectGroup(row: GridRow<T>, value: boolean) {
    this.svc$.selectGroup(row, value);
  }

  isGroupSelected(row: GridRow<T>) {
    return this.svc$.isGroupSelected(row);
  }
}
