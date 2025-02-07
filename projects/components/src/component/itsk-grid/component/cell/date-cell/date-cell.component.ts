import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ItskDatePickerComponent } from '../../../../itsk-date-picker/itsk-date-picker/itsk-date-picker.component';
import { CellComponentBase } from '../../../model/cell-component-base';
import { GridColumn } from '../../../model/grid-column';
import { GridRow, IId } from '../../../model/grid-row';
import { ItskGridService } from '../../../service/itsk-grid.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'itsk-date-cell',
    templateUrl: './date-cell.component.html',
    styleUrls: ['./date-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskDatePickerComponent, FormsModule, DatePipe]
})
export class DateCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column?: GridColumn;
  @Input() row?: GridRow<any>;
  @ViewChild('input', { static: false }) input?: ItskDatePickerComponent;

  constructor(svc$: ItskGridService<T>, cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  setValue(value: Date) {
    if (this.row && this.column) this.row.data[this.column.name] = value;
    this.valueChanged();
  }

  override startEdit() {
    setTimeout(() => {
      this.input?.openPicker(true);
      this.cdr$.markForCheck();
    }, 0);
  }

  override stopEdit() {
    this.cdr$.markForCheck();
  }
}
