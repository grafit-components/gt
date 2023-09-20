import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ComponentRef,
  Input,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import {GridRow, IId} from '../../model/grid-row';
import {GridColumn} from '../../model/grid-column';
import {DetailComponentBase} from '../../model/detail-component-base';

@Component({
  selector: 'itsk-grid-detail',
  template: '',
  styleUrls: ['./itsk-grid-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridDetailComponent<T extends IId> implements OnInit {
  private componentRef: ComponentRef<DetailComponentBase<T>>;
  private init: boolean;

  row$: GridRow<T>;

  @Input()
  set row(value: GridRow<T>) {
    this.row$ = value;
    if (this.init) {
      this.componentRef.instance.row = value;
      this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }

  get row() {
    return this.row$;
  }

  columns$: GridColumn[];

  @Input()
  set columns(value: GridColumn[]) {
    this.columns$ = value;
    if (this.init) {
      this.componentRef.instance.columns = value;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  get columns() {
    return this.columns$;
  }

  @Input() detailComponent: Type<DetailComponentBase<T>>;

  constructor(private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (!DetailComponentBase.isPrototypeOf(this.detailComponent)) {
      throw new Error('Details component must extend DetailComponentBase');
    }
    const compFactory = this.componentFactoryResolver.resolveComponentFactory<DetailComponentBase<T>>(this.detailComponent);
    this.componentRef = this.viewContainerRef.createComponent<DetailComponentBase<T>>(compFactory);
    this.componentRef.instance.row = this.row;
    this.componentRef.instance.columns = this.columns;
    this.componentRef.changeDetectorRef.markForCheck();
    this.init = true;
  }
}
