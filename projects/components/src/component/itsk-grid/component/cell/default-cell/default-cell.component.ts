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
  selector: 'itsk-default-cell',
  templateUrl: './default-cell.component.html',
  styleUrls: ['./default-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column: GridColumn;
  @Input() row: GridRow<T>;
  @ViewChild('input', {static: false}) input: ElementRef;

  // edit: boolean;

  constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  startEdit() {
    this.cdr$.markForCheck();
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  stopEdit() {
    this.cdr$.markForCheck();
  }
}
