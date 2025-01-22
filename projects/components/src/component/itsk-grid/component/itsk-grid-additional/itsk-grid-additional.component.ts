import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { AdditionalComponentBase } from '../../model/additional-component-base';
import { GridColumn } from '../../model/grid-column';
import { GridRow, IId } from '../../model/grid-row';

@Component({
    selector: 'itsk-grid-additional',
    template: '',
    styleUrls: ['./itsk-grid-additional.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ItskGridAdditionalComponent<T extends IId> implements OnInit {
  private componentRef?: ComponentRef<any>;

  @Input() locked: boolean = false;
  @Input() row?: GridRow<T>;

  private columns$?: GridColumn[];

  @Input()
  set columns(val: GridColumn[]) {
    this.columns$ = val;
    if (this.componentRef) {
      this.componentRef.instance.columns = this.columns$;
    }
  }

  @Input() additionalComponent?: Type<AdditionalComponentBase<T>>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    if (!this.additionalComponent || !AdditionalComponentBase.isPrototypeOf(this.additionalComponent)) {
      throw new Error('Additional component must extend AdditionalComponentBase');
    }
    const compFactory = this.componentFactoryResolver.resolveComponentFactory<AdditionalComponentBase<T>>(this.additionalComponent);
    this.componentRef = this.viewContainerRef.createComponent<AdditionalComponentBase<T>>(compFactory);
    this.componentRef.instance.locked = this.locked;
    this.componentRef.instance.row = this.row;
    this.componentRef.instance.columns = this.columns$;
  }
}
