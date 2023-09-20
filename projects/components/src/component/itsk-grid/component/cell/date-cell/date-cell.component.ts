import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CellComponentBase} from '../../../model/cell-component-base';
import {GridColumn} from '../../../model/grid-column';
import {GridRow, IId} from '../../../model/grid-row';
import {ItskDatePickerComponent} from '../../../../itsk-date-picker/itsk-date-picker/itsk-date-picker.component';
import {ItskGridService} from '../../../service/itsk-grid.service';

@Component({
  selector: 'itsk-date-cell',
  templateUrl: './date-cell.component.html',
  styleUrls: ['./date-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column: GridColumn;
  @Input() row: GridRow<any>;
  @ViewChild('input', {static: false}) input: ItskDatePickerComponent;

  constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  setValue(value: Date) {
    this.row.data[this.column.name] = value;
    this.valueChanged();
  }

  startEdit() {
    setTimeout(() => {
      this.input.openPicker(true);
      this.cdr$.markForCheck();
    }, 0);
  }

  stopEdit() {
    this.cdr$.markForCheck();
  }
}
