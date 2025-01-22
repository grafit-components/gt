import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CellComponentBase } from '../../../model/cell-component-base';
import { GridColumn } from '../../../model/grid-column';
import { GridRow, IId } from '../../../model/grid-row';
import { ItskGridService } from '../../../service/itsk-grid.service';

@Component({
    selector: 'itsk-default-cell',
    templateUrl: './default-cell.component.html',
    styleUrls: ['./default-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DefaultCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column?: GridColumn;
  @Input() row?: GridRow<T>;
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
