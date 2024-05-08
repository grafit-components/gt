import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ItskSelectComponent } from '../../../../itsk-select/itsk-select/itsk-select.component';
import { CellComponentBase } from '../../../model/cell-component-base';
import { GridColumn } from '../../../model/grid-column';
import { GridRow, IId } from '../../../model/grid-row';
import { ItskGridService } from '../../../service/itsk-grid.service';

@Component({
  selector: 'itsk-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  column$?: GridColumn;

  @Input()
  set column(val: GridColumn | undefined) {
    this.column$ = val;
  }

  get column(): GridColumn | undefined {
    return this.column$;
  }

  row$?: GridRow<any>;

  @Input()
  set row(val: GridRow<any> | undefined) {
    this.row$ = val;
  }

  get row(): GridRow<any> | undefined {
    return this.row$;
  }

  get value() {
    return this.getValue();
  }

  @ViewChild('input', { static: false }) input?: ItskSelectComponent;

  // edit: boolean;

  getValue() {
    if (
      this.column$?.filterOptions === null ||
      this.column$?.filterOptions === undefined ||
      !(this.column$.filterOptions instanceof Array)
    ) {
      return '';
    }
    const item = this.column$?.filterOptions.find((option) => {
      return option.id === this.row$?.data[this.column$?.name ?? 0];
    });
    if (item === null || item === undefined) {
      return '';
    }
    return item.name;
  }

  constructor(svc$: ItskGridService<T>, cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  override startEdit() {
    if (!this.column$?.editable) {
      return;
    }
    setTimeout(() => {
      this.input?.open();
      this.cdr$.markForCheck();
    }, 0);
  }

  override stopEdit() {
    this.cdr$.markForCheck();
  }

  override ngOnInit() {
    super.ngOnInit();
  }
}
