import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {CellComponentBase} from '../../../model/cell-component-base';
import {GridColumn} from '../../../model/grid-column';
import {GridRow, IId} from '../../../model/grid-row';
import {ItskGridService} from '../../../service/itsk-grid.service';

@Component({
  selector: 'itsk-focus-cell',
  templateUrl: './focus-cell.component.html',
  styleUrls: ['./focus-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FocusCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column: GridColumn;
  @Input() row: GridRow<any>;
  @ViewChild('input', {static: false}) input: ElementRef;

  value$: string;

  constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onEdit(value: string) {
    this.value$ = value;
  }

  startEdit() {
    this.value$ = this.row.data[this.column.name];
    this.cdr$.markForCheck();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.select();
    }, 0);
  }

  stopEdit() {
    this.row.data[this.column.name] = this.value$;
    this.valueChanged();
    this.cdr$.markForCheck();
  }

  cancelEdit() {
    this.cdr$.markForCheck();
  }
}
