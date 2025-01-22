import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FilterType } from '../../../../itsk-filter/model/enum/filter-type.enum';
import { CellComponentBase } from '../../../model/cell-component-base';
import { GridColumn } from '../../../model/grid-column';
import { GridRow, IId } from '../../../model/grid-row';
import { DateCellComponent } from '../date-cell/date-cell.component';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
import { ListCellComponent } from '../list-cell/list-cell.component';
import { NumericCellComponent } from '../numeric-cell/numeric-cell.component';

@Component({
    selector: 'itsk-grid-cell-wrapper',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridCellWrapperComponent<T extends IId> implements OnInit, OnDestroy {
  init = false;
  componentRef?: ComponentRef<CellComponentBase<any>>;

  private column$?: GridColumn;

  @Input()
  set column(val: GridColumn | undefined) {
    this.column$ = val;
    if (this.init && this.componentRef) {
      this.componentRef.instance.column = val;
      this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }

  get column(): GridColumn | undefined {
    return this.column$;
  }

  private row$?: GridRow<T>;

  @Input()
  set row(val: GridRow<T> | undefined) {
    this.row$ = val;
    if (this.init && this.componentRef) {
      this.componentRef.instance.row = val;
      this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }

  get row(): GridRow<T> | undefined {
    return this.row$;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}
  private getCellComponent(column: GridColumn) {
    if (column.cellComponent === null || column.cellComponent === undefined || !CellComponentBase.isPrototypeOf(column.cellComponent)) {
      switch (column.filterType) {
        case FilterType.Number:
          return NumericCellComponent;
        case FilterType.List:
          return ListCellComponent;
        case FilterType.Date:
          return DateCellComponent;
        default:
          return DefaultCellComponent;
      }
    }
    return column.cellComponent;
  }
  ngOnInit() {
    // if (!CellComponentBase.isPrototypeOf(this.column.cellComponent)) {
    //   throw new Error('Cell component must extend CellComponentBase');
    // }
    if (!this.column) {
      return;
    }
    this.column.cellComponent = this.getCellComponent(this.column);
    const compFactory = this.componentFactoryResolver.resolveComponentFactory<CellComponentBase<any>>(this.column.cellComponent);
    this.componentRef = this.viewContainerRef.createComponent<CellComponentBase<any>>(compFactory);
    this.componentRef.instance.column = this.column;
    this.componentRef.instance.row = this.row;
    this.init = true;
  }

  ngOnDestroy() {}
}
