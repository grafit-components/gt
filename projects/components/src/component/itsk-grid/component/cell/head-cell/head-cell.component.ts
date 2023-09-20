import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewContainerRef} from '@angular/core';
import {GridColumn} from '../../../model/grid-column';
import {HeadCellComponentBase} from '../../../model/head-cell-component-base';
import {DefaultHeadCellComponent} from '../default-head-cell/default-head-cell.component';

@Component({
  selector: 'itsk-head-cell',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadCellComponent implements OnInit {
  private componentRef: ComponentRef<HeadCellComponentBase>;
  private init: boolean;

  @Input() column: GridColumn;

  sorted$: boolean;

  @Input()
  set sorted(val: boolean) {
    this.sorted$ = val;
    if (this.init) {
      this.componentRef.instance.sorted = this.sorted$;
    }
  }

  filtered$: boolean;

  @Input()
  set filtered(val: boolean) {
    this.filtered$ = val;
    if (this.init) {
      this.componentRef.instance.filtered = this.filtered$;
    }
  }

  asc$: boolean;

  @Input()
  set asc(val: boolean) {
    this.asc$ = val;
    if (this.init) {
      this.componentRef.instance.asc = this.asc$;
    }
  }

  constructor(private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  private getHeadCellComponent(column: GridColumn) {
    if (column.headCellComponent === null
      || column.headCellComponent === undefined
      || !HeadCellComponentBase.isPrototypeOf(column.headCellComponent)) {
      return DefaultHeadCellComponent;
    }
    return column.headCellComponent;
  }

  ngOnInit() {
    // if (!HeadCellComponentBase.isPrototypeOf(this.column.headCellComponent)) {
    //   throw new Error('Head cell component must extend HeadCellComponentBase');
    // }
    this.column.headCellComponent = this.getHeadCellComponent(this.column);
    const compFactory = this.componentFactoryResolver.resolveComponentFactory<HeadCellComponentBase>(this.column.headCellComponent);
    this.componentRef = this.viewContainerRef.createComponent<HeadCellComponentBase>(compFactory);
    this.componentRef.instance.column = this.column;
    this.componentRef.instance.filtered = this.filtered$;
    this.componentRef.instance.sorted = this.sorted$;
    this.componentRef.instance.asc = this.asc$;
    this.init = true;
  }
}
