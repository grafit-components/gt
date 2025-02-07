import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CellComponentBase } from '../../../model/cell-component-base';
import { GridColumn } from '../../../model/grid-column';
import { GridRow, IId } from '../../../model/grid-row';
import { ItskGridService } from '../../../service/itsk-grid.service';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'itsk-focus-cell',
    templateUrl: './focus-cell.component.html',
    styleUrls: ['./focus-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule]
})
export class FocusCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column?: GridColumn;
  @Input() row?: GridRow<any>;
  @ViewChild('input', { static: false }) input?: ElementRef;

  value$?: string;

  constructor(svc$: ItskGridService<T>, cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  onEdit(value: string) {
    this.value$ = value;
  }

  override startEdit() {
    if (this.row && this.column) this.value$ = this.row.data[this.column.name];
    this.cdr$.markForCheck();
    setTimeout(() => {
      this.input?.nativeElement.focus();
      this.input?.nativeElement.select();
    }, 0);
  }

  override stopEdit() {
    if (this.row && this.column) this.row.data[this.column.name] = this.value$;
    this.valueChanged();
    this.cdr$.markForCheck();
  }

  override cancelEdit() {
    this.cdr$.markForCheck();
  }
}
