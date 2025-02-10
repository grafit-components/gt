import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CellComponentBase } from '../../../model/cell-component-base';
import { GridColumn } from '../../../model/grid-column';
import { GridRow, IId } from '../../../model/grid-row';
import { ItskGridService } from '../../../service/itsk-grid.service';

import { FormsModule } from '@angular/forms';
import { ItskNumberPipe } from '../../../../../pipe/itsk-number-pipe/itsk-number.pipe';

@Component({
    selector: 'itsk-numeric-cell',
    templateUrl: './numeric-cell.component.html',
    styleUrls: ['./numeric-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, ItskNumberPipe]
})
export class NumericCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column?: GridColumn;
  @Input() row?: GridRow<any>;
  @ViewChild('input', { static: false }) input?: ElementRef;

  // edit: boolean;

  constructor(svc$: ItskGridService<T>, cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override startEdit() {
    this.cdr$.markForCheck();
    setTimeout(() => {
      this.input?.nativeElement.focus();
    }, 0);
  }

  override stopEdit() {
    this.cdr$.markForCheck();
  }
}
