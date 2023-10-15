import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostBinding, HostListener,
  Input, OnChanges, OnDestroy,
  OnInit, Output, SimpleChanges,
  Type, ViewChild
} from '@angular/core';
import {GridRow, IId} from '../../model/grid-row';
import {ItskGridService} from '../../service/itsk-grid.service';
import {ItskGridEditEvent} from '../../model/enum/itsk-grid-edit-event.enum';
import {IGrid} from '../../model/grid/i-grid';
import {GridColumn} from '../../model/grid-column';
import {FilterState} from '../../model/filter-state';
import {AdditionalComponentBase} from '../../model/additional-component-base';
import {AggregateComponentBase} from '../../model/aggregate-component-base';
import {ICellCoordinates, ICellEvent} from '../../model/cell-coordinates';
import {BooleanFunc, BooleanPromiseFunc, boolFuncOrPromiseCallback} from '../../../../util/object-util';
import {ItskGridEditType} from '../../model/enum/itsk-grid-edit-type.enum';
import {ItskGridEditMode} from '../../model/enum/itsk-grid-edit-mode.enum';
import {takeWhile} from 'rxjs/operators';
import {GridSortEvent} from '../../model/grid-sort-event';
import {DateUtil} from '../../../../util/date-util';
import {SortParam} from '../../../itsk-filter/model/sort-param';
import {FilterType} from '../../../itsk-filter/model/enum/filter-type.enum';
import {DateFilter} from '../../../itsk-filter/model/date-filter';
import {DateFilterValue} from '../../../itsk-filter/model/date-filter-value';
import {StringFilter} from '../../../itsk-filter/model/string-filter';
import {NumericFilter} from '../../../itsk-filter/model/numeric-filter';
import {NumericFilterValue} from '../../../itsk-filter/model/numeric-filter-value';
import {ListFilter} from '../../../itsk-filter/model/list-filter';
import {ListFilterType} from '../../../itsk-filter/model/enum/list-filter-type.enum';
import {GroupingType} from '../../model/enum/grouping-type.enum';
import {GroupRowComponentBase} from '../../model/group-row-component-base';
import {GroupRowDefaultComponent} from '../row/group-row-default/group-row-default.component';
import {ItskGridSelectRowsByType} from '../../model/enum/itsk-grid-select-rows-by-type';
import {ItskGridSelectType} from '../../model/enum/itsk-grid-select-type';

@Component({
  selector: 'itsk-grid',
  templateUrl: './itsk-grid.component.html',
  styleUrls: ['./itsk-grid.component.scss'],
  providers: [ItskGridService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridComponent<T extends IId> implements IGrid<T>, OnInit, AfterViewInit, OnDestroy, OnChanges {
  alive = true;
  left = 0;

  @HostBinding('class.grid') gridClass = true;

  /**
   * Данные для отображения в таблице
   */
  data$?: GridRow<T>[];
  @Input()
  set data(data: GridRow<T>[]) {
    this.data$ = data;
  }

  @Input() aggregate?: GridRow<T>;

  /**
   * Столбцы таблицы
   */
  @Input() columns?: GridColumn[];

  /** Состояние сортировки и фильтрации */
  state$?: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
  }

  @Output() stateChange: EventEmitter<FilterState> = new EventEmitter();

  /** Сохранять состояние между сессиями */
  @Input() stateful = true;

  /** Наименование для хранения состояние в localStorage */
  @Input() cookieName?: string;

  /** Использовать виртуальный скролл */
  @Input() virtual: boolean = false;

  /** Компонент для отображения дополнительного содержимого под основной строкой */
  @Input() additionalComponent?: Type<AdditionalComponentBase<any>>;

  /** Компонент для отображения строки аггрегации */
  @Input() aggregateComponent?: Type<AggregateComponentBase<any>>;

  /** Оповещение о том, что кликнули мимо грида */
  @Output() bodyLeft = new EventEmitter<GridRow<T>>();

  /** Активная строка */
  @Input() activeRow?: GridRow<T>;
  @Output() activeRowChange: EventEmitter<GridRow<T>> = new EventEmitter();

  /** Выбранные стргоки */
  @Input() selectedRows?: GridRow<T>[];
  @Output() selectedRowsChange: EventEmitter<GridRow<T>[]> = new EventEmitter();
  @Input() selectRowsBy: ItskGridSelectRowsByType = 'checkbox';
  @Input() selectType: ItskGridSelectType = 'single';

  /** Оповещение о том, что строка покинута */
  @Output() rowLeft = new EventEmitter<GridRow<T>>();

  /** Оповещение о том, что строка выбрана */
  @Output() rowClick = new EventEmitter<any>();

  /** Оповещение о том, что строка выбрана */
  @Output() rowDoubleClick = new EventEmitter<ICellCoordinates<T>>();

  @Output() rowEditStart = new EventEmitter<GridRow<T>>();

  @Output() rowEditEnd = new EventEmitter<GridRow<T>>();

  @Output() cellClick = new EventEmitter<ICellEvent<T>>();

  /** Оповещение о том, что строка выбрана */
  @Output() cellDoubleClick = new EventEmitter<ICellEvent<T>>();

  @Output() cellFocus = new EventEmitter<ICellEvent<T>>();

  /** Оповещение о том, что строка выбрана */
  @Output() cellEditStart = new EventEmitter<ICellCoordinates<T>>();
  @Output() cellEditEnd = new EventEmitter<ICellCoordinates<T>>();
  @Output() valueChange = new EventEmitter<ICellCoordinates<T> | null>();
  @Output() cellKeyUp = new EventEmitter<ICellEvent<T>>();

  @Input() grouping: boolean = false;
  @Input() groupRowComponent: Type<GroupRowComponentBase<T>> = GroupRowDefaultComponent;
  @Input() openLevels: number = 0;
  @Input() tree: boolean = false;
  /**
   * Тип отображения группировки
   */
  @Input() groupingType: GroupingType = GroupingType.Row;

  private rowSelectable$: boolean | BooleanFunc<GridRow<T>> | BooleanPromiseFunc<GridRow<T>> = true;

  @Input()
  set rowSelectable(val: boolean | BooleanFunc<GridRow<T>> | BooleanPromiseFunc<GridRow<T>>) {
    this.rowSelectable$ = val;
    this.svc$.rowSelectable = val;
  }

  get rowSelectable(): boolean | BooleanFunc<GridRow<T>> | BooleanPromiseFunc<GridRow<T>> {
    return this.rowSelectable$;
  }

  @Input() rowEditable: boolean | BooleanFunc<GridRow<T>> | BooleanPromiseFunc<GridRow<T>> = true;

  @Input() cellEditable: boolean | BooleanFunc<ICellCoordinates<T>> | BooleanPromiseFunc<ICellCoordinates<T>> = true;

  @Input() editType?: ItskGridEditType;

  @Input() editOn?: ItskGridEditEvent;

  @Input() editMode?: ItskGridEditMode;

  @ViewChild('gridBody', {read: ElementRef}) gridBody?: ElementRef;

  protected element: ElementRef;

  leftTop?: HTMLElement;
  rightTop?: HTMLElement;
  leftBottom?: HTMLElement;
  rightBottom?: HTMLElement;
  aggregateRight?: HTMLElement;

  bindScrollCallback = this.onScroll.bind(this);

  private currentEditRow: GridRow<T> | null = null;
  private currentEditCell: ICellCoordinates<T> | null = null;

  constructor(protected svc$: ItskGridService<T>,
              elementRef: ElementRef,
              protected cdr$: ChangeDetectorRef) {
    this.element = elementRef;
    this.svc$.rowSelectable = true;
    this.svc$.selectType = this.selectType;
    this.svc$.sortEvent.pipe(takeWhile(_ => this.alive)).subscribe((event: GridSortEvent) => {
      this.sortColumn(event);
    });

    this.svc$.stateChanged.pipe(takeWhile(_ => this.alive)).subscribe((event: FilterState) => {
      this.setState(event);
    });

    this.svc$.filterClear.pipe(takeWhile(_ => this.alive)).subscribe((event: GridColumn) => {
      this.clearFilter(event);
    });

    this.svc$.columnsUpdate.pipe(takeWhile(_ => this.alive)).subscribe(() => {
      this.updateColumns();
    });

    this.svc$.selectedRows
      .pipe(takeWhile(_ => this.alive))
      .subscribe((rows: GridRow<T>[]) => {
        this.selectedRowsChange.emit(rows);
      });

    this.svc$.valueChanged
      .pipe(takeWhile(_ => this.alive))
      .subscribe((coordinates) => {
        this.valueChange.emit(coordinates);
      });
  }

  private startEditRowOrCell(coordinates: ICellCoordinates<any>): void {
    if (this.canStartEditRow(coordinates)) {
      this.startEditRow(coordinates.row);
    }
    if (this.canStartEditCell(coordinates)) {
      this.startEditCell(coordinates);
    }
  }

  private canStartEditCell(coordinates: ICellCoordinates<any>): boolean {
    return this.editType === ItskGridEditType.Cell
      && (this.currentEditCell?.row !== coordinates.row || this.currentEditCell?.column.name !== coordinates.column.name);
  }

  private canStartEditRow(coordinates: ICellCoordinates<any>): boolean {
    return this.editType === ItskGridEditType.Row && this.currentEditRow !== coordinates.row;
  }

  @HostListener('document:click', ['$event']) handleClickOutside(event: MouseEvent) {
    if (event.composedPath !== undefined) {
      const path = event.composedPath();
      if (path.find(_ => _ === this.element.nativeElement)) {
        return;
      }
      this.leaveBody();
    }
  }

  @HostListener('focusin', ['$event']) focusIn(event: any) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellFocus.emit(coordinates);
      if (this.editOn === ItskGridEditEvent.Focus) {
        this.startEditRowOrCell(coordinates);
      }
    }
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.rowClick.emit(coordinates);
      this.cellClick.emit(coordinates);
      if (this.activeRow !== coordinates?.row) {
        boolFuncOrPromiseCallback<GridRow<T>>(this.rowSelectable, (row: GridRow<T>) => {
          this.leaveRow(this.activeRow);
          this.activeRow = row;
          this.activeRowChange.emit(row);
        })(coordinates.row);
      }
      if (this.selectRowsBy === 'mouse') {
        if (this.selectType === 'multiple' && event.ctrlKey) {
          this.svc$.selectRow(coordinates.row);
        } else {
          this.svc$.selectRows([coordinates.row]);
        }
      }
      if (this.editType === ItskGridEditType.Row && this.currentEditRow && this.currentEditRow !== coordinates.row) {
        this.stopEditRow(this.currentEditRow);
      }
      if (this.editType === ItskGridEditType.Cell && this.currentEditCell
        && (this.currentEditCell.row !== coordinates.row || this.currentEditCell.column.name !== coordinates.column.name)) {
        this.stopEditCell(this.currentEditCell);
      }

      if (this.editOn === ItskGridEditEvent.Click) {
        this.startEditRowOrCell(coordinates);
      }
    }
  }

  @HostListener('keyup', ['$event'])
  keyup(event: KeyboardEvent) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellKeyUp.emit(coordinates);
    }
    if (this.editOn === ItskGridEditEvent.Enter && this.gridBody?.nativeElement.contains(event.target)) {
      let nextCell;
      switch (event.key) {
        case 'Tab':
          nextCell = this.getSiblingCell(event.target as HTMLElement, !event.shiftKey, true);
          break;
        case 'ArrowUp':
          nextCell = this.getSiblingColumnCell(event.target as HTMLElement, false);
          break;
        case 'ArrowDown':
          nextCell = this.getSiblingColumnCell(event.target as HTMLElement, true);
          break;
        case 'ArrowRight':
          nextCell = this.getSiblingCell(event.target as HTMLElement, true, false);
          break;
        case 'ArrowLeft':
          nextCell = this.getSiblingCell(event.target as HTMLElement, false, false);
          break;
        case 'Enter':
          this.getCell(event.target as HTMLElement)?.focus();
          if (this.currentEditCell) {
            this.stopEditCell(this.currentEditCell);
          } else {
            if (coordinates) {
              this.startEditRowOrCell(coordinates);
              this.currentEditCell = coordinates;
            }
          }
          break;
        case 'Escape':
          if (this.currentEditCell) {
            this.cancelEditCell(this.currentEditCell);
            const eventTarget = coordinates?.event?.target;
            if (eventTarget !== null) {
              const cell = this.getCell(eventTarget as HTMLElement);
              if (cell) {
                cell.focus();
              }
            }
          }
          break;
        default:
          break;
      }

      if (nextCell) {
        if (this.currentEditCell) {
          this.stopEditCell(this.currentEditCell);
        }
        nextCell.focus();
      }
    }
  }

  @HostListener('dblclick', ['$event'])
  dblclick(event: MouseEvent) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.rowDoubleClick.emit(coordinates);
      this.cellDoubleClick.emit(coordinates);
      if (this.editOn === ItskGridEditEvent.DoubleClick) {
        this.startEditRowOrCell(coordinates);
      }
    }
  }

  private getCell(element: HTMLElement): HTMLElement | null {
    if (!element.parentElement) {
      return null;
    }
    if (element.tagName.toLowerCase() === 'itsk-grid-cell') {
      return element;
    }
    return this.getCell(element.parentElement);
  }

  private getSiblingCell(element: HTMLElement, isNextSibling = false, isTabAction = false): HTMLElement | null {
    if (element.tagName.toLowerCase() === 'itsk-grid-cell') {
      let overallElement: HTMLElement | null | undefined = element;
      while (!overallElement?.classList.contains('grid__body__right')) {
        overallElement = overallElement?.parentElement;
        if (overallElement === null) {
          return null;
        }
      }
      const cell = this.getCell(element);
      const cellRowIndex = cell?.getAttribute('data-row');
      const cellReflectIndex = cell?.getAttribute('ng-reflect-index');
      const cellList: HTMLElement[] = Array.from(overallElement.querySelectorAll('itsk-grid-cell'));
      if (isTabAction) {
        const maxReflectIndex = cellList[cellList.length - 1].getAttribute('ng-reflect-index');
        return cellList.find(_ => (
          (_.getAttribute('data-row') === cellRowIndex) &&
          (_.getAttribute('ng-reflect-index') === (parseInt(cellReflectIndex || '', 10) + (isNextSibling ? 1 : -1)).toString())
        )) || cellList.find(_ => (
          (_.getAttribute('data-row') === (parseInt(cellRowIndex || '', 10) + (isNextSibling ? 1 : -1)).toString()) &&
          (_.getAttribute('ng-reflect-index') === (isNextSibling ? '0' : maxReflectIndex))
        )) || null;
      } else {
        return cellList.find(_ => (
          (_.getAttribute('data-row') === cellRowIndex) &&
          (_.getAttribute('ng-reflect-index') === (parseInt(cellReflectIndex || '', 10) + (isNextSibling ? 1 : -1)).toString())
        )) || null;
      }
    }
    if (!element.parentElement) {
      return null;
    }
    return this.getSiblingCell(element.parentElement, isNextSibling, isTabAction);
  }

  private getSiblingColumnCell(element: HTMLElement, isNextSibling = false): HTMLElement | null {
    const cell = this.getCell(element);
    const cellRowIndex = cell?.getAttribute('data-row');
    const cellReflectIndex = cell?.getAttribute('ng-reflect-index');
    while (!element?.parentElement?.parentElement?.classList.contains('grid__body__right')) {
      if (!element.parentElement) {
        return null;
      }
      element = element.parentElement;
    }
    if (element.parentElement.parentElement) {
      const cellList: HTMLElement[] = Array.from(element.parentElement.parentElement.querySelectorAll('itsk-grid-cell'));
      return cellList.find(_ => (
        (_.getAttribute('data-row') === (parseInt(cellRowIndex || '', 10) + (isNextSibling ? 1 : -1)).toString()) &&
        (_.getAttribute('ng-reflect-index') === cellReflectIndex)
      )) || null;
    }
    return this.getSiblingColumnCell(element.parentElement, isNextSibling);
  }

  private getCoordinates(event: Event): ICellEvent<T> | null {
    const cell = this.getCell(event.target as HTMLElement);
    if (cell) {
      const rowIndex = cell.getAttribute('data-row');
      const columnName = cell.getAttribute('data-column');
      if (rowIndex && columnName) {
        const row = this.svc$.getRowByIndex(rowIndex);
        const column = this.svc$.getColumnByName(columnName);
        return {
          row,
          column: column ? column : new GridColumn(),
          event
        };
      }
    }
    return null;
  }

  leaveBody() {
    this.bodyLeft.emit(this.activeRow);
    if (this.editType === ItskGridEditType.Row && this.currentEditRow) {
      this.stopEditRow(this.currentEditRow);
    }
    if (this.editType === ItskGridEditType.Cell && this.currentEditCell) {
      this.stopEditCell(this.currentEditCell);
    }
  }

  leaveRow(row?: GridRow<T>) {
    if (row !== null && row !== undefined) {
      this.rowLeft.emit(row);
    }
  }

  startEditRow(row: GridRow<T>) {
    if (this.editType !== ItskGridEditType.Row) {
      return;
    }
    boolFuncOrPromiseCallback<GridRow<T>>(this.rowEditable, (editRow: GridRow<T>) => {
      editRow.edit = true;
      this.cdr$.detectChanges();
      this.svc$.startEditRow(editRow);
      this.currentEditRow = editRow;
      this.rowEditStart.emit(editRow);
    })(row);
  }

  stopEditRow(row: GridRow<T>) {
    this.currentEditRow = null;
    this.svc$.stopEditRow(row);
    this.rowEditEnd.emit(row);
  }

  startEditCell(cell: ICellCoordinates<T>) {
    if (this.editType !== ItskGridEditType.Cell) {
      return;
    }
    boolFuncOrPromiseCallback<ICellCoordinates<T>>(this.cellEditable, (editCell: ICellCoordinates<T>) => {
      this.cdr$.detectChanges();
      this.svc$.startEditCell(editCell);
      this.currentEditCell = editCell;
      this.cellEditStart.emit(editCell);
    })(cell);
  }

  stopEditCell(cell: ICellCoordinates<T>) {
    this.currentEditCell = null;
    this.svc$.stopEditCell(cell);
    this.cellEditEnd.emit(cell);
  }

  cancelEditCell(cell: ICellCoordinates<T>) {
    this.currentEditCell = null;
    this.svc$.cancelEditCell(cell);
    this.cellEditEnd.emit(cell);
  }

  saveHidden() {
    if (this.stateful && this.cookieName && this.columns) {
      localStorage.setItem(`${this.cookieName}_hidden`, JSON.stringify(this.getHidden(this.columns)));
    }
  }

  getHidden(columns: GridColumn[]): string[] {
    const res: string[] = [];
    columns.forEach((col) => {
      if (col.hidden) {
        res.push(col.name);
      }
      if (col.columns !== null && col.columns !== undefined && col.columns.length) {
        res.push(...this.getHidden(col.columns as any));
      }
    });
    return res;
  }

  restoreHiddenState() {
    if (this.stateful && this.cookieName) {
      const newState = localStorage.getItem(`${this.cookieName}_hidden`) || 'null';
      const hidden = JSON.parse(newState);
      if (hidden !== null && hidden !== undefined && hidden.length > 0) {
        if(this.columns)
        this.columns = this.setHidden(this.columns, hidden);
      }
    }
  }

  setHidden(columns: GridColumn[], hidden: string[]): GridColumn[] {
    return columns.map((col) => {
      if (hidden.indexOf(col.name) >= 0) {
        col.hidden = true;
      }
      if (col.columns !== null && col.columns !== undefined && col.columns.length) {
        col.columns = this.setHidden(col.columns as any, hidden) as any;
      }
      return col;
    });
  }

  restoreFilters() {
    if (this.stateful && this.cookieName !== null && this.cookieName !== undefined) {
      let newState = Object.assign(this.state$ ?? {}, FilterState.restore(this.cookieName));
      newState = DateUtil.ConvertDateStringsToDates(newState);
      this.state$ = new FilterState(newState);
    }
  }

  ngOnInit() {
    this.restoreHiddenState();
    this.restoreFilters();
    if(this.state$)
    this.setState(this.state$);
  }

  ngAfterViewInit() {
    this.leftTop = this.element.nativeElement.querySelector('.grid__head__left');
    this.rightTop = this.element.nativeElement.querySelector('.grid__head__right');
    this.leftBottom = this.element.nativeElement.querySelector('.grid__body__left');
    this.rightBottom = this.element.nativeElement.querySelector('.grid__body__right');
    this.aggregateRight = this.element.nativeElement.querySelector('.grid__aggregate_right');
    if(this.rightBottom)
    this.rightBottom.addEventListener('scroll', this.bindScrollCallback);
  }

  ngOnDestroy() {
    if(this.rightBottom)
    this.rightBottom.removeEventListener('scroll', this.bindScrollCallback);
    this.alive = false;
  }

  sortColumn(sortEvent: GridSortEvent): void {
    if(!this.state$)return;
    const column = sortEvent.column;
    const shiftKey = sortEvent.shiftKey;
    if (!column.sortable) {
      return;
    }
    const sort = this.state$.sortParams.find((sortParam: SortParam) => {
      return sortParam.field === column.sortField;
    });
    if (sort === null || sort === undefined) {
      if (!shiftKey) {
        this.state$.sortParams.length = 0;
      }
      this.state$.sortParams.push(new SortParam({field: column.sortField, asc: true, order: 0}));
    } else {
      if (!sort.asc) {
        this.state$.sortParams = this.clearSort(sort, this.state$.sortParams);
      } else {
        sort.asc = !sort.asc;
        if (!shiftKey) {
          this.state$.sortParams = [sort];
        }
      }
    }
    this.setState(this.state$);
  }

  clearSort(sort: SortParam, sortParams: SortParam[]) {
    const index = sortParams.indexOf(sort);
    sortParams.splice(index, 1);
    return sortParams;
  }

  clearFilter(column: GridColumn) {
    if(!this.state$) return;
    if (column !== null && column !== undefined && column.filterable) {
      switch (column.filterType) {
        case FilterType.Date:
          this.state$.addDateFilter(new DateFilter({
            name: column.name,
            fieldName: column.filterField,
            value: new DateFilterValue()
          }));
          break;
        case FilterType.String:
          this.state$.addStringFilter(new StringFilter({
            name: column.name,
            fieldName: column.filterField,
            value: ''
          }));
          break;
        case FilterType.Number:
          this.state$.addNumericFilter(new NumericFilter({
            name: column.name,
            fieldName: column.filterField,
            value: new NumericFilterValue()
          }));
          break;
        case FilterType.List:
          this.state$.addListFilter(new ListFilter({
            name: column.name,
            fieldName: column.filterField,
            value: [],
            type: ListFilterType.None
          }));
          break;
      }
      this.setState(this.state$);
    }
  }

  updateColumns() {
    this.columns = this.columns?.map((_: any) => new GridColumn(_));
    this.saveHidden();
  }

  private setState(state: FilterState) {
    this.state$ = new FilterState(state);
    if(this.cookieName)
    this.state$.save(this.cookieName);
    this.stateChange.emit(this.state$);
  }

  onScroll() {
    if(this.rightTop && this.rightBottom) {
      const left = this.rightBottom.scrollLeft;
      this.rightTop.style.transform = `translateX(${'-' + left + 'px'})`;
      this.left = left;
      // this.cdr$.markForCheck();
      const list = this.element.nativeElement.querySelectorAll('.grid__row_locked');
      list.forEach((_: any) => {
        _.style.left = `${this.left + 'px'}`;
      });
    }
  }

  pinColumn(column: GridColumn) {
    this.columns?.forEach((col: GridColumn) => {
      if (col.name === column.name) {
        col.locked = !col.locked;
      }
    });
    this.updateColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.svc$.grouping = this.grouping;
    this.svc$.openLevels = this.openLevels;
    this.svc$.tree = this.tree;
    if (changes.hasOwnProperty('columns') && this.columns) {
      this.svc$.setColumns(this.columns);
    }

    if (changes.hasOwnProperty('data') && this.data$) {
      this.svc$.setData(this.data$);
      setTimeout(() => {
        const list = this.element.nativeElement.querySelectorAll('.grid__row_locked');
        list.forEach((_: any) => {
          _.style.left = `${this.left + 'px'}`;
        });
      });
    }

    if (changes.hasOwnProperty('selectedRows')) {
      if (changes['selectedRows'].previousValue !== changes['selectedRows'].currentValue) {
        if(this.selectedRows)
        this.svc$.selectRows(this.selectedRows);
      }
    }

    if (changes.hasOwnProperty('selectType')) {
      if (changes['selectType'].previousValue !== changes['selectType'].currentValue) {
        this.svc$.selectType = this.selectType;
      }
    }
  }
}
