import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {GridSortEvent} from '../model/grid-sort-event';
import {FilterState} from '../model/filter-state';
import {GridColumn} from '../model/grid-column';
import {ColumnResizeEvent} from '../model/column-resize-event';
import {ColumnReorderEvent} from '../model/column-reorder-event';
import {GridRow, IId} from '../model/grid-row';
import {IColumnPosition} from '../model/column-position';
import {ICellCoordinates} from '../model/cell-coordinates';
import {BooleanFunc, BooleanPromiseFunc, boolFuncOrPromiseCallback} from '../../../util/object-util';
import {GridUtil} from '../model/util';
import {ArrayUtil} from '../../../util/array-util';

@Injectable()
export class ItskGridService<T extends IId> {
  grouping: boolean = false;
  openLevels: number = 0;
  tree: boolean = false;

  private data: GridRow<T>[] = [];
  private displayData: GridRow<T>[] = [];
  private visibleData$: ReplaySubject<GridRow<T>[]> = new ReplaySubject<GridRow<T>[]>(1);
  visibleData = this.visibleData$.asObservable();

  private allColumns: GridColumn[] = [];
  private columns$: ReplaySubject<GridColumn[]> = new ReplaySubject<GridColumn[]>(1);
  columns = this.columns$.asObservable();
  private groupColumns: GridColumn[] = [];
  private flatColumns: GridColumn[] = [];
  private visibleColumns$: ReplaySubject<GridColumn[]> = new ReplaySubject<GridColumn[]>(1);
  visibleColumns = this.visibleColumns$.asObservable();


  rowSelectable: boolean | BooleanFunc<GridRow<T>> | BooleanPromiseFunc<GridRow<T>> = false;
  selectType: 'single' | 'multiple' | 'none' = 'none';

  private editRowStart$ = new Subject<GridRow<T> | null>();
  editRowStart = this.editRowStart$.asObservable();

  private editRowStop$ = new Subject<GridRow<T> | null>();
  editRowStop = this.editRowStop$.asObservable();

  private editCellStart$ = new Subject<ICellCoordinates<T> | null>();
  editCellStart = this.editCellStart$.asObservable();

  private editCellStop$ = new Subject<ICellCoordinates<T> | null>();
  editCellStop = this.editCellStop$.asObservable();

  private editCellCancel$ = new Subject<ICellCoordinates<T> | null>();
  editCellCancel = this.editCellCancel$.asObservable();

  private valueChanged$ = new Subject<ICellCoordinates<T> | null>();
  valueChanged = this.valueChanged$.asObservable();

  private stateChanged$ = new Subject<FilterState>();
  stateChanged = this.stateChanged$.asObservable();

  private filterClear$ = new Subject<GridColumn>();
  filterClear = this.filterClear$.asObservable();

  // private columnPin$ = new Subject<GridColumn>();
  // columnPin = this.columnPin$.asObservable();

  // private columnResize$ = new Subject<ColumnResizeEvent>();
  // columnResize = this.columnResize$.asObservable();

  private sortEvent$ = new Subject<GridSortEvent>();
  sortEvent = this.sortEvent$.asObservable();

  private dragSource$?: GridColumn;

  // private columnReorder$ = new Subject<ColumnReorderEvent>();
  // columnReorder = this.columnReorder$.asObservable();

  private columnsUpdate$ = new Subject();
  columnsUpdate = this.columnsUpdate$.asObservable();

  private columnMenu$ = new Subject<IColumnPosition>();
  columnMenu = this.columnMenu$.asObservable();

  // private groupToggle$ = new Subject<GridRow<T>>();
  // groupToggle = this.groupToggle$.asObservable();

  private selectedRows$ = new BehaviorSubject<GridRow<T>[]>([]);
  selectedRows = this.selectedRows$.asObservable();

  constructor() {
  }

  setData(value: GridRow<T>[]) {
    this.data = value;
    if (this.grouping && this.groupColumns?.length > 0) {
      this.displayData = this.initGroupedData(this.data, this.groupColumns);
    } else if (this.tree) {
      this.displayData = this.initTreeData(this.data);
    } else {
      this.displayData = this.data;
    }
    this.visibleData$.next(this.displayData);
  }

  setColumns(value: GridColumn[]) {
    this.allColumns = value.map(_ => new GridColumn(_));
    this.columns$.next(this.allColumns);
    this.flatColumns = GridUtil.flattenColumns(this.allColumns);
    this.visibleColumns$.next(this.flatColumns.filter(_ => _.hidden !== true));
    if (this.grouping) {
      this.groupColumns = this.flatColumns.filter(_ => _.groupBy).sort((a: GridColumn, b: GridColumn) => {
        return a.groupingOrder > b.groupingOrder ? 1 : -1;
      });
    }
  }

  sort(sortEvent: GridSortEvent) {
    this.sortEvent$.next(sortEvent);
  }

  setState(state: FilterState) {
    this.stateChanged$.next(state);
  }

  clearFilter(column: GridColumn) {
    this.filterClear$.next(column);
  }

  pinColumn(column: GridColumn) {
    this.allColumns.forEach((col: GridColumn) => {
      if (col.name === column.name) {
        col.locked = !col.locked;
      }
    });
    this.setColumns(this.allColumns);
  }

  resizeColumn(event: ColumnResizeEvent) {
    const found = this.getColumnByName(event.column.name);
    if (found !== null && found !== undefined) {
      const newWidth = event.originalWidth + event.resize;
      found.width = newWidth < 10 ? 10 : newWidth;
      found.flex = 0;
    }
    this.setColumns(this.allColumns);
  }

  dragStart(column: GridColumn) {
    this.dragSource$ = column;
  }

  reorderColumn(column: GridColumn) {
    if(!this.dragSource$) {
      return;
    }
    const event = new ColumnReorderEvent(this.dragSource$, column);
    const sourceParent = this.findParent(event.source, this.allColumns);
    const targetParent = this.findParent(event.target, this.allColumns);
    if (sourceParent && targetParent) {
      const sourceIndex = sourceParent.indexOf(event.source);
      sourceParent.splice(sourceIndex, 1);
      const targetIndex = targetParent.indexOf(event.target);
      targetParent.splice(targetIndex, 0, event.source);
      event.source.locked = event.target.locked;
    }
    this.setColumns(this.allColumns);
  }

  updateColumns() {
    this.setColumns(this.allColumns);
    this.columnsUpdate$.next(undefined);
  }

  openColumnMenu(column: GridColumn, position: DOMRect) {
    this.columnMenu$.next({
      column,
      position
    });
  }

  startEditRow(row: GridRow<T>) {
    this.editRowStart$.next(row);
  }

  stopEditRow(row: GridRow<T>) {
    this.editRowStop$.next(row);
  }

  startEditCell(cellCoordinates: ICellCoordinates<T>) {
    this.editCellStart$.next(cellCoordinates);
  }

  stopEditCell(cellCoordinates: ICellCoordinates<T>) {
    this.editCellStop$.next(cellCoordinates);
  }

  cancelEditCell(cellCoordinates: ICellCoordinates<T>) {
    this.editCellCancel$.next(cellCoordinates);
  }

  selectRows(rows: GridRow<T>[]) {
    this.selectedRows$.next(rows);
  }

  selectRow(row: GridRow<T>) {
    boolFuncOrPromiseCallback<GridRow<T>>(this.rowSelectable, (_: GridRow<T>) => {
      if (this.selectType === 'none') {
        return;
      }
      if (this.selectType === 'single') {
        this.selectedRows$.next([row]);
      } else {
        const value = this.selectedRows$.getValue();
        this.selectedRows$.next(this.addOrRemove(row, value));
      }
    })(row);
  }

  selectGroup(row: GridRow<T>, val: boolean) {
    if (this.grouping && row.groupColumn) {
      const groupColumn = this.getColumnByName(row.groupColumn);
      const groupChildren = this.data.filter(_ => {
        return row.groupValue.every((groupValue: any, index: number) => {
          return _.groupValue.indexOf(groupValue) === index;
        });
      });
      if (groupColumn && groupChildren) {
        const value = this.selectedRows$.getValue();
        if (val) {
          this.selectedRows$.next([...value, ...groupChildren]);
        } else {
          this.selectedRows$.next(value.filter(_ => {
            return groupChildren.indexOf(_) < 0;
          }));
        }
      }
    }
  }

  isGroupSelected(row: GridRow<T>) {
    if (this.grouping) {
      const getGroupChildren = this.getGroupChildren(row);
      if (getGroupChildren && getGroupChildren.every(_ => this.selectedRows$.value.indexOf(_) >= 0)) {
        return true;
      }
    }
    return false;
  }

  areAllSelected() {
    const all = ArrayUtil.flatten(this.data, 'children', false);
    if (all && all.length && all.every(_ => this.selectedRows$.value.indexOf(_) >= 0)) {
      return true;
    }
    return false;
  }

  selectAll(val: boolean) {
    if (val) {
      const all = ArrayUtil.flatten(this.data, 'children', false);
      this.selectedRows$.next(all);
    } else {
      this.selectedRows$.next([]);
    }
  }

  private getGroupChildren(row: GridRow<T>) {
    if (this.grouping && row.groupColumn) {
      const groupColumn = this.getColumnByName(row.groupColumn);
      if (groupColumn) {
        return this.data.filter(_ => {
          return row.groupValue.every((value: any, index: number) => {
            return _.groupValue.indexOf(value) === index;
          });
        });
      }
    }
    return null;
  }

  toggleRow(row: GridRow<T>) {
    if (this.grouping) {
      this.toggleGroup(row);
    }
    if (this.tree) {
      this.toggleTree(row);
    }
  }

  changeValue(coordinates: ICellCoordinates<T>) {
    this.valueChanged$.next(coordinates);
  }

  private addOrRemove<G>(needle: G, list: G[]): G[] {
    if (list.indexOf(needle) >= 0) {
      return list.filter(_ => _ !== needle);
    } else {
      return [...list, needle];
    }
  }


  private initGroupedData(data: GridRow<T>[], groupColumns: GridColumn[]): GridRow<T>[] {
    let result: GridRow<T>[] = [];
    result = this.createGroups(data, this.displayData, groupColumns, 0);
    return result;
  }

  private createGroups(
    data: GridRow<T>[],
    previousData: GridRow<T>[],
    groupColumns: GridColumn[],
    level: number,
    parentGroupValue?: any[]
  ): GridRow<T>[] {
    const result: GridRow<T>[] = [];
    data.forEach((row: GridRow<T>) => {
      const needle = result.find((resultItem) => {
        return resultItem.groupColumn === groupColumns[level].name
          && resultItem.groupValue[level] === this.getGroupValue(row, groupColumns[level]);
      });
      if (!needle) {
        const group = new GridRow<T>({});
        group.groupValue = parentGroupValue
          ? [...parentGroupValue, this.getGroupValue(row, groupColumns[level])]
          : [this.getGroupValue(row, groupColumns[level])];
        group.groupColumn = groupColumns[level].name;
        group.level = level;
        group.isGroup = true;
        result.push(group);
        group.children.push(...data.filter((_: GridRow<T>) => {
          return group?.groupValue[level] === this.getGroupValue(_, groupColumns[level]);
        }));
        group.children.forEach(_ => {
          _.groupValue = group.groupValue;
          _.level = group.level + 1;
        });
        const previousDataGroup = previousData?.find(_ => (_.isGroup && _.groupValue.toString() === group.groupValue.toString()));
        if (previousDataGroup?.expanded ?? this.openLevels > level) {
          group.expanded = true;
          if (groupColumns.length > level + 1) {
            result.push(...this.createGroups(group.children, previousData, groupColumns, level + 1, group.groupValue));
          } else {
            result.push(...group.children);
          }
        }
      }
    });
    return result;
  }


  private getGroupValue(row: GridRow<T>, column: GridColumn) {
    if (column.groupByFn !== null && column.groupByFn !== undefined) {
      return column.groupByFn(row);
    }
    return row.data[column.name];
  }


  private initTreeData(data: GridRow<T>[]): GridRow<T>[] {
    let result: GridRow<T>[] = [];
    result = this.createTree(data, 0, []);
    return result;
  }

  private createTree(data: GridRow<T>[], level: number, parents: GridRow<T>[]): GridRow<T>[] {
    const result: GridRow<T>[] = [];
    data.forEach((row: GridRow<T>) => {
      row.level = level;
      row.parents = parents;
      result.push(row);
      if (this.openLevels > level && row.children?.length > 0) {
        row.expanded = true;
        result.push(...this.createTree(row.children, level + 1, [...parents, row]));
      }
    });
    return result;
  }

  private toggleGroup(row: GridRow<T>) {
    if (row.expanded) {
      if (this.groupColumns.length > row.level + 1) {
        this.displayData.splice(this.displayData.indexOf(row) + 1,
          0,
          ...this.createGroups(row.children, [], this.groupColumns, row.level + 1, row.groupValue));
      } else {
        this.displayData.splice(this.displayData.indexOf(row) + 1, 0, ...row.children);
      }
      this.displayData = [...this.displayData];
    } else {
      const groupColumn = this.groupColumns.find(x => x.name === row.groupColumn);
      if (groupColumn) {
        this.displayData = this.displayData.filter(_ => {
          return !row.groupValue.every((value: any, index: number) => {
            return _.groupValue.indexOf(value) === index;
          }) || row === _;
        });
      }
    }
    this.visibleData$.next(this.displayData);
  }

  private toggleTree(row: GridRow<T>) {
    if (row.expanded) {
      const children = this.getOpenChildren(row);
      this.displayData.splice(this.displayData.indexOf(row) + 1, 0, ...children);
      this.displayData = [...this.displayData];
    } else {
      this.displayData = this.displayData.filter(_ => {
        return _.parents.indexOf(row) < 0 || row === _;
      });
    }
    this.visibleData$.next(this.displayData);

  }

  private getOpenChildren(row: GridRow<T>) {
    const children: GridRow<T>[] = [];
    if (row.children?.length > 0) {
      row.children.forEach((_: GridRow<T>) => {
        _.level = row.level + 1;
        _.parents = [...row.parents, row];
        children.push(_);
        if (_.expanded && row.children?.length > 0) {
          children.push(...this.getOpenChildren(_));
        }
      });
    }
    return children;
  }

  private findColumn(columnName: string, columns: GridColumn[]): GridColumn | null {
    for (let i = 0, l = columns.length; i < l; i++) {
      const col = columns[i];
      if (col.name === columnName) {
        return col;
      } else {
        if (col.columns && col.columns.length > 0) {
          const result = this.findColumn(columnName, col.columns as any);
          if (result !== null && result !== undefined) {
            return result;
          }
        }
      }
    }
    return null;
  }

  private findParent(column: GridColumn, columns: GridColumn[]): GridColumn[] | null {
    const found = columns.find((x) => {
      return x.name === column.name;
    });
    if (found !== null && found !== undefined) {
      return columns;
    }
    for (let i = 0, l = columns.length; i < l; i++) {
      const col = columns[i];
      if (col.columns && col.columns.length) {
        const result = this.findParent(column, col.columns as any);
        if (result !== null && result !== undefined) {
          return result;
        }
      }
    }
    return null;
  }

  getRowByIndex(rowIndex: string) {
    return this.displayData[parseInt(rowIndex, 10)];
  }

  getColumnByName(columnName: string) {
    return this.findColumn(columnName, this.allColumns);
  }
}
