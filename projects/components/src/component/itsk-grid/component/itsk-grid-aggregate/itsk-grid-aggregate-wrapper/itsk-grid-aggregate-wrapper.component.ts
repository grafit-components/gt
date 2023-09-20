import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {GridRow, IId} from '../../../model/grid-row';
import {GridColumn} from '../../../model/grid-column';
import {AggregateComponentBase} from '../../../model/aggregate-component-base';

@Component({
  selector: 'itsk-itsk-grid-aggregate-wrapper',
  template: ''
})
export class ItskGridAggregateWrapperComponent<T extends IId> implements OnInit {
  private componentRef: ComponentRef<any>;

  @Input() locked: boolean;
  @Input() data: GridRow<T>;

  private columns$: GridColumn[];

  @Input()
  set columns(val: GridColumn[]) {
    this.columns$ = val;
    if (this.componentRef) {
      this.componentRef.instance.columns = this.columns$;
    }
  }

  @Input() aggregateComponent: Type<AggregateComponentBase<T>>;

  constructor(private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (!AggregateComponentBase.isPrototypeOf(this.aggregateComponent)) {
      throw new Error('Aggregate component must extend AggregateComponentBase');
    }
    const compFactory =
      this.componentFactoryResolver.resolveComponentFactory<AggregateComponentBase<T>>(this.aggregateComponent);
    this.componentRef = this.viewContainerRef.createComponent<AggregateComponentBase<T>>(compFactory);
    this.componentRef.instance.locked = this.locked;
    this.componentRef.instance.data = this.data;
    this.componentRef.instance.columns = this.columns$;
  }
}
