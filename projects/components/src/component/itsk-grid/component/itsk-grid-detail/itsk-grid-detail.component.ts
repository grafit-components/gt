import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DetailComponentBase } from '../../model/detail-component-base';
import { GridColumn } from '../../model/grid-column';
import { GridRow, IId } from '../../model/grid-row';

@Component({
    selector: 'itsk-grid-detail',
    template: '',
    styleUrls: ['./itsk-grid-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridDetailComponent<T extends IId> implements OnInit {
  private componentRef?: ComponentRef<DetailComponentBase<T>>;
  private init: boolean = false;

  row$?: GridRow<T>;

  @Input()
  set row(value: GridRow<T> | undefined) {
    if (!value) return;
    this.row$ = value;
    if (this.init && this.componentRef) {
      this.componentRef.instance.row = value;
      this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }

  get row() {
    return this.row$;
  }

  columns$?: GridColumn[];

  @Input()
  set columns(value: GridColumn[] | undefined) {
    if (!value) return;
    this.columns$ = value;
    if (this.init && this.componentRef) {
      this.componentRef.instance.columns = value;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  get columns() {
    return this.columns$;
  }

  @Input() detailComponent?: Type<DetailComponentBase<T>>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    if (!this.detailComponent || !DetailComponentBase.isPrototypeOf(this.detailComponent)) {
      throw new Error('Details component must extend DetailComponentBase');
    }
    const compFactory = this.componentFactoryResolver.resolveComponentFactory<DetailComponentBase<T>>(this.detailComponent);
    this.componentRef = this.viewContainerRef.createComponent<DetailComponentBase<T>>(compFactory);
    if (this.row) this.componentRef.instance.row = this.row;
    if (this.columns) this.componentRef.instance.columns = this.columns;
    this.componentRef.changeDetectorRef.markForCheck();
    this.init = true;
  }
}
