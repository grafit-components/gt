import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ItskGridSelectRowsByType } from '../../model/enum/itsk-grid-select-rows-by-type';
import { ItskGridSelectType } from '../../model/enum/itsk-grid-select-type';
import { FilterState } from '../../model/filter-state';
import { GridColumn } from '../../model/grid-column';
import { GridUtil } from '../../model/util';
import { ItskGridService } from '../../service/itsk-grid.service';

import { ItskGridHeadGroupComponent } from '../itsk-grid-head-group/itsk-grid-head-group.component';

@Component({
    selector: 'itsk-grid-head',
    templateUrl: './itsk-grid-head.component.html',
    styleUrls: ['./itsk-grid-head.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskGridHeadGroupComponent]
})
export class ItskGridHeadComponent implements OnInit, OnDestroy {
  private alive = true;
  /** Строки заголовка таблицы */
  private columns$: GridColumn[] = [];

  locked: GridColumn[] = [];
  unlocked: GridColumn[] = [];
  lockedBasis: number = 0;
  unlockedBasis: number = 0;
  lockedFlex: number = 0;
  unlockedFlex: number = 0;
  isChromium: boolean = false;

  set columns(columns: GridColumn[]) {
    this.columns$ = this.prepareColumns(columns);
    this.locked = GridUtil.initLockedColumns(this.columns$, true);
    this.unlocked = GridUtil.initLockedColumns(this.columns$, false);
    this.lockedBasis = this.getBasis(this.locked);
    this.unlockedBasis = this.getBasis(this.unlocked);
    this.lockedFlex = this.getFlex(this.locked);
    this.unlockedFlex = this.getFlex(this.unlocked);
    this.cdr$.detectChanges();
  }

  get columns(): GridColumn[] {
    return this.columns$;
  }

  /** Настройки грида */
  state$?: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
  }

  @Input() selectRowsBy: ItskGridSelectRowsByType = 'mouse';
  @Input() selectType: ItskGridSelectType = 'single';

  // @Output() hoveredColumn: EventEmitter<string> = new EventEmitter();

  constructor(
    private svc$: ItskGridService<any>,
    private cdr$: ChangeDetectorRef,
  ) {
    this.isChromium = this.checkChromium(window);
    this.svc$.columns.pipe(takeWhile((_) => this.alive)).subscribe((_) => (this.columns = _));
  }

  // columnHover(name: string) {
  //   this.hoveredColumn.emit(name);
  // }

  ngOnInit() {}

  ngOnDestroy() {
    this.alive = false;
  }

  private prepareColumns(columns: GridColumn[]): GridColumn[] {
    if (columns === null || columns === undefined || columns.length === 0) {
      return [];
    }
    columns.forEach((column: any) => {
      if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
        column.columns = this.prepareColumns(column.columns);
        column.width = column.columns.reduce((a: any, b: any) => {
          return a + (b.hidden ? 0 : b.width);
        }, 0);
        column.flex = column.columns.reduce((a: any, b: any) => {
          return a + (b.hidden ? 0 : b.flex);
        }, 0);
      }
    });
    return columns;
  }

  private getBasis(columns: GridColumn[]): number {
    let width = 0;

    columns.forEach((column) => {
      if (column.columns && column.columns.length) {
        width += this.getBasis(column.columns as any);
      } else {
        width += column.hidden ? 0 : column.width;
      }
    });
    return width;
  }

  private getFlex(columns: GridColumn[]): number {
    let flex = 0;

    columns.forEach((column) => {
      if (column.columns && column.columns.length) {
        flex += this.getFlex(column.columns as any);
      } else {
        flex += column.hidden ? 0 : column.flex;
      }
    });
    return flex;
  }

  private checkChromium(wind: any): boolean {
    return wind.chrome !== null && typeof wind.chrome !== 'undefined' && wind.navigator.vendor === 'Google Inc.';
  }

  track(index: number, item: GridColumn) {
    return item.name;
  }
}
