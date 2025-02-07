import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ItskDatePickerComponent } from '../../../../itsk-date-picker/itsk-date-picker/itsk-date-picker.component';
import { CellComponentBase } from '../../../model/cell-component-base';
import { GridColumn } from '../../../model/grid-column';
import { GridRow, IId } from '../../../model/grid-row';
import { ItskGridService } from '../../../service/itsk-grid.service';
import { NgIf, DatePipe } from '@angular/common';
import { ItskMonthPickerComponent } from '../../../../itsk-date-picker/itsk-month-picker/itsk-month-picker.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'itsk-month-cell',
    templateUrl: './month-cell.component.html',
    styleUrls: ['./month-cell.component.scss'],
    imports: [NgIf, ItskMonthPickerComponent, FormsModule, DatePipe]
})
export class MonthCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column?: GridColumn;
  @Input() row?: GridRow<any>;
  @ViewChild('input', { static: false }) input?: ItskDatePickerComponent;

  constructor(svc$: ItskGridService<T>, cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  override ngOnInit() {
    super.ngOnInit();
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
