import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef, HostBinding,
  Input, OnDestroy,
  OnInit, Type
} from '@angular/core';
import {GridRow, IId} from '../../../model/grid-row';
import {GridColumn} from '../../../model/grid-column';
import {CellComponentBase} from '../../../model/cell-component-base';
import {ItskGridService} from '../../../service/itsk-grid.service';
import {AdditionalComponentBase} from '../../../model/additional-component-base';
import {takeWhile} from 'rxjs/operators';
import {GroupingType} from '../../../model/enum/grouping-type.enum';
import {ItskGridSelectRowsByType} from '../../../model/enum/itsk-grid-select-rows-by-type';
import {ItskGridSelectType} from '../../../model/enum/itsk-grid-select-type';

@Component({
  selector: 'itsk-grid-cell',
  templateUrl: './itsk-grid-cell.component.html',
  styleUrls: ['./itsk-grid-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridCellComponent<T extends IId> implements OnInit, OnDestroy {
  GroupingType = GroupingType;
  private alive = true;
  componentRef?: ComponentRef<CellComponentBase<any>>;
  @Input() index?: number;
  @Input() additionalComponent?: Type<AdditionalComponentBase<T>>;
  @Input() column?: GridColumn;

  @Input() row?: GridRow<T>;
  @Input() grouping: boolean = false;
  @Input() groupingType?: GroupingType;
  @Input() tree: boolean = false;
  @Input() selectRowsBy: ItskGridSelectRowsByType = 'mouse';
  @Input() selectType: ItskGridSelectType = 'single';
  originalSelected: GridRow<T>[] = [];
  selectedRows: GridRow<T>[] = [];

  constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
  }

  selectRow() {
    this.selectedRows = [...this.originalSelected];
    if(this.row)
    this.svc$.selectRow(this.row);
  }

  ngOnInit() {
    this.svc$.selectedRows.pipe(takeWhile(_ => this.alive)).subscribe(_ => {
      if (this.index === 0) {
        this.originalSelected = _;
        this.selectedRows = [...this.originalSelected];
        this.cdr$.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
