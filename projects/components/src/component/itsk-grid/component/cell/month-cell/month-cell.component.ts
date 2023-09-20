import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {GridRow, IId} from '../../../model/grid-row';
import {CellComponentBase} from '../../../model/cell-component-base';
import {GridColumn} from '../../../model/grid-column';
import {ItskDatePickerComponent} from '../../../../itsk-date-picker/itsk-date-picker/itsk-date-picker.component';
import {ItskGridService} from '../../../service/itsk-grid.service';

@Component({
  selector: 'itsk-month-cell',
  templateUrl: './month-cell.component.html',
  styleUrls: ['./month-cell.component.scss']
})
export class MonthCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column: GridColumn;
  @Input() row: GridRow<any>;
  @ViewChild('input', {static: false}) input: ItskDatePickerComponent;

  constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  ngOnInit() {
    super.ngOnInit();
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
