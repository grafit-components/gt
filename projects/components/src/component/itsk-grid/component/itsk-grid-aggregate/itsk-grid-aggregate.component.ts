import {Component, Input, OnDestroy, OnInit, Type} from '@angular/core';
import {GridColumn} from '../../model/grid-column';
import {GridRow, IId} from '../../model/grid-row';
import {GridUtil} from '../../model/util';
import {AggregateComponentBase} from '../../model/aggregate-component-base';
import {ItskGridService} from '../../service/itsk-grid.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'itsk-grid-aggregate',
  templateUrl: './itsk-grid-aggregate.component.html',
  styleUrls: ['./itsk-grid-aggregate.component.scss']
})
export class ItskGridAggregateComponent<T extends IId> implements OnInit, OnDestroy {
  private alive = true;
  /**
   * Описание колонок таблицы
   */
  private columns$: GridColumn[] = [];

  locked: GridColumn[] = [];
  unlocked: GridColumn[] = [];
  lockedBasis: number;
  unlockedBasis: number;
  lockedFlex: number;
  unlockedFlex: number;

  set columns(columns: GridColumn[]) {
    this.columns$ = GridUtil.flattenColumns(columns).filter(_ => _.hidden !== true);
    this.locked = GridUtil.initLockedColumns(this.columns$, true);
    this.unlocked = GridUtil.initLockedColumns(this.columns$, false);
    this.lockedBasis = this.getBasis(this.locked);
    this.unlockedBasis = this.getBasis(this.unlocked);
    this.lockedFlex = this.getFlex(this.locked);
    this.unlockedFlex = this.getFlex(this.unlocked);
  }

  /**
   * Настройки грида
   */
  @Input() aggregateComponent: Type<AggregateComponentBase<T>>;
  /**
   * Данные для отображения
   */
  @Input() data: GridRow<T>;

  // @Input() hoveredColumn: string;

  constructor(protected svc$: ItskGridService<T>) {
    this.svc$.visibleColumns.pipe(takeWhile(_ => this.alive)).subscribe(_ => this.columns = _);

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.alive = false;
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
    return row;
  }

  trackColumns(index: number, column: GridColumn) {
    return column.name;
  }
}
