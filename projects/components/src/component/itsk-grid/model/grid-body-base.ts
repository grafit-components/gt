import { ChangeDetectorRef, Directive, HostListener, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ItskGridSelectRowsByType } from '../model/enum/itsk-grid-select-rows-by-type';
import { ItskGridSelectType } from '../model/enum/itsk-grid-select-type';
import { ItskGridService } from '../service/itsk-grid.service';
import { AdditionalComponentBase } from './additional-component-base';
import { GroupingType } from './enum/grouping-type.enum';
import { ItskGridEditEvent } from './enum/itsk-grid-edit-event.enum';
import { GridColumn } from './grid-column';
import { GridRow, IId } from './grid-row';
import { GroupRowComponentBase } from './group-row-component-base';
import { GridUtil } from './util';

@Directive()
export class GridBodyBase<T extends IId> implements OnInit, OnDestroy {
  alive = true;
  GroupingType = GroupingType;
  /** Описание колонок таблицы */

  selectedRows: GridRow<T>[] = [];

  locked: GridColumn[] = [];
  unlocked: GridColumn[] = [];
  lockedBasis: number = 0;
  unlockedBasis: number = 0;
  lockedFlex: number = 0;
  unlockedFlex: number = 0;

  @Input() activeRow?: GridRow<T>;

  private columns$: GridColumn[] = [];

  set columns(columns: GridColumn[]) {
    this.columns$ = columns;
    this.locked = GridUtil.initLockedColumns(this.columns$, true);
    this.unlocked = GridUtil.initLockedColumns(this.columns$, false);
    this.lockedBasis = this.getBasis(this.locked);
    this.unlockedBasis = this.getBasis(this.unlocked);
    this.lockedFlex = this.getFlex(this.locked);
    this.unlockedFlex = this.getFlex(this.unlocked);
    this.cdr$.markForCheck();
  }

  get columns(): GridColumn[] {
    return this.columns$;
  }

  /** Настройки грида */
  @Input() additionalComponent?: Type<AdditionalComponentBase<T>>;
  /** Данные для отображения */
  data?: GridRow<T>[];

  @Input() tree: boolean = false;

  @Input() grouping: boolean = false;
  /** Тип отображения группировки */
  @Input() groupingType: GroupingType = GroupingType.SingleGroupCell;
  @Input() groupRowComponent?: Type<GroupRowComponentBase<T>>;
  @Input() openLevels: number = 0;

  @Input() selectRowsBy: ItskGridSelectRowsByType = 'mouse';
  @Input() selectType: ItskGridSelectType = 'single';
  @Input() editOn?: ItskGridEditEvent;

  constructor(
    protected svc$: ItskGridService<T>,
    protected cdr$: ChangeDetectorRef,
  ) {
    this.svc$.selectedRows.pipe(takeWhile((_) => this.alive)).subscribe((_) => {
      this.selectedRows = _;
      this.cdr$.markForCheck();
    });

    this.svc$.visibleColumns.pipe(takeWhile((_) => this.alive)).subscribe((_) => {
      this.columns = _;
      this.cdr$.markForCheck();
    });
    this.svc$.visibleData.pipe(takeWhile((_) => this.alive)).subscribe((_) => {
      this.data = _;
      this.cdr$.markForCheck();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.alive = false;
  }

  @HostListener('keydown.Tab', ['$event'])
  @HostListener('keydown.shift.tab', ['$event'])
  keydown(event: KeyboardEvent) {
    if (this.editOn === ItskGridEditEvent.Enter) {
      event.preventDefault();
    }
  }

  private getBasis(columns: GridColumn[]): number {
    return columns.reduce((a, b) => {
      return a + b.width;
    }, 0);
  }

  private getFlex(columns: GridColumn[]): number {
    return columns.reduce((a, b) => {
      return a + b.flex;
    }, 0);
  }

  trackRow(index: number, row: GridRow<T>) {
    return row.hash;
  }

  trackColumns(index: number, column: GridColumn) {
    return column.name;
  }
}
