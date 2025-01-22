import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ItskAlign } from '../../../../common/model/itsk-align.enum';
import { FilterType } from '../../../itsk-filter/model/enum/filter-type.enum';
import { ColumnResizeEvent } from '../../model/column-resize-event';
import { ItskGridSelectRowsByType } from '../../model/enum/itsk-grid-select-rows-by-type';
import { ItskGridSelectType } from '../../model/enum/itsk-grid-select-type';
import { FilterState } from '../../model/filter-state';
import { GridColumn } from '../../model/grid-column';
import { IId } from '../../model/grid-row';
import { GridSortEvent } from '../../model/grid-sort-event';
import { ItskGridService } from '../../service/itsk-grid.service';

@Component({
    selector: 'itsk-grid-head-cell',
    templateUrl: './itsk-grid-head-cell.component.html',
    styleUrls: ['./itsk-grid-head-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ItskGridHeadCellComponent<T extends IId> implements OnInit, OnDestroy {
  state$?: FilterState;
  alive = true;
  @Input() rootIndex?: number;
  @Input() selfIndex?: number;

  @Input() column?: GridColumn;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.setState();
  }

  @Input() allColumns: GridColumn[] = [];
  @Input() selectRowsBy: ItskGridSelectRowsByType = 'mouse';
  @Input() selectType: ItskGridSelectType = 'single';

  @HostBinding('class.grid__head__cell__filtered') filtered: boolean = false;
  @HostBinding('class.grid__head__cell__sorted') sorted: boolean = false;
  asc: boolean = false;

  align = ItskAlign.Right;

  dragStartPx: number = 0;
  dragEndPx: number = 0;

  @HostListener('drop', ['$event']) drop(event: DragEvent) {
    const move = event.dataTransfer && event.dataTransfer.getData('text');
    if (move === 'move') {
      if (this.column) this.svc$.reorderColumn(this.column);
    }
  }

  @HostListener('dragover', ['$event']) allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragstart', ['$event']) moveStart(event: DragEvent) {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData('text', 'move');
    }
    if (this.column) this.svc$.dragStart(this.column);
  }

  constructor(
    private svc$: ItskGridService<T>,
    private cdr$: ChangeDetectorRef,
    private element$: ElementRef,
  ) {
    this.svc$.selectedRows.pipe(takeWhile((_) => this.alive)).subscribe((_) => {
      this.cdr$.markForCheck();
    });
  }

  selectAll(value: boolean) {
    return this.svc$.selectAll(value);
  }

  allSelected() {
    return this.svc$.areAllSelected();
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.alive = false;
  }

  setState() {
    if (this.state$) {
      this.setSortState();
      this.setFilterState();
    }
  }

  setSortState() {
    this.sorted = false;
    if (this.state$ && this.state$.sortParams && this.state$.sortParams.length) {
      const param = this.state$.sortParams.find((x) => {
        return x.field === this.column?.sortField;
      });
      if (param) {
        this.sorted = true;
        this.asc = param.asc;
      }
    }
  }

  setFilterState() {
    if (!this.column || !this.column?.filterable) {
      return;
    }
    this.filtered = false;
    switch (this.column?.filterType) {
      case FilterType.String:
        if (this.state$ && this.state$.stringFilters) {
          const filter = this.state$.stringFilters.find((x) => {
            return x.fieldName === this.column?.filterField;
          });
          if (filter && filter.value && filter.value.length) {
            this.filtered = true;
          }
        }
        break;
      case FilterType.List:
        if (this.state$ && this.state$.listFilters) {
          const filter = this.state$.listFilters.find((x) => {
            return x.fieldName === this.column?.filterField;
          });
          if (filter && filter.value && filter.value.length) {
            this.filtered = true;
          }
        }
        break;
      case FilterType.Number:
        if (this.state$ && this.state$.numericFilters) {
          const filter = this.state$.numericFilters.find((x) => {
            return x.fieldName === this.column?.filterField;
          });
          if (
            filter &&
            filter.value &&
            ((filter.value.lessThan !== null && filter.value.lessThan !== undefined) ||
              (filter.value.greaterThan !== null && filter.value.greaterThan !== undefined) ||
              (filter.value.equalsTo !== null && filter.value.equalsTo !== undefined))
          ) {
            this.filtered = true;
          }
        }
        break;
      case FilterType.Date:
        if (this.state$ && this.state$.dateFilters) {
          const filter = this.state$.dateFilters.find((x) => {
            return x.fieldName === this.column?.filterField;
          });
          if (
            filter &&
            filter.value &&
            ((filter.value.lessThan !== null && filter.value.lessThan !== undefined) ||
              (filter.value.greaterThan !== null && filter.value.greaterThan !== undefined))
          ) {
            this.filtered = true;
          }
        }
        break;
    }
  }

  sortColumn(event: MouseEvent): void {
    if (this.column) this.svc$.sort(new GridSortEvent(this.column, event.shiftKey));
  }

  dragStart(event: DragEvent) {
    event.stopPropagation();
    this.dragStartPx = event.pageX;
  }

  dragEnd(event: DragEvent) {
    this.dragEndPx = event.pageX;
    const parent = (event.target as HTMLElement).parentElement;
    if (parent) {
      if (this.column) this.svc$.resizeColumn(new ColumnResizeEvent(this.column, parent.clientWidth, this.dragEndPx - this.dragStartPx));
    }
  }

  columnSettings(event: MouseEvent) {
    setTimeout(() => {
      if (this.column) this.svc$.openColumnMenu(this.column, this.element$.nativeElement.getBoundingClientRect());
    }, 0);
  }
}
