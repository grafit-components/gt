import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {GridColumn} from '../../../model/grid-column';
import {GridRow, IId} from '../../../model/grid-row';
import {GroupRowComponentBase} from '../../../model/group-row-component-base';

@Component({
  selector: 'itsk-group-row-wrapper',
  template: '',
  styleUrls: ['./group-row-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupRowWrapperComponent<T extends IId> implements OnInit {
  init = false;
  componentRef?: ComponentRef<GroupRowComponentBase<T>>;

  private columns$?: GridColumn[];

  @Input() groupRowComponent: any;

  @Input()
  set columns(val: GridColumn[]) {
    this.columns$ = val;
    if (this.init && this.componentRef) {
      this.componentRef.instance.columns = val;
      this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }

  get columns(): GridColumn[] | undefined {
    return this.columns$;
  }

  private row$?: GridRow<T>;

  @Input()
  set row(val: GridRow<T>) {
    this.row$ = val;
    if (this.init && this.componentRef) {
      this.componentRef.instance.row = val;
      this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }

  get row(): GridRow<T> | undefined {
    return this.row$;
  }

  constructor(private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (!GroupRowComponentBase.isPrototypeOf(this.groupRowComponent)) {
      throw new Error('Group row component must extend GroupRowComponentBase');
    }
    const compFactory = this.componentFactoryResolver.resolveComponentFactory<GroupRowComponentBase<T>>(this.groupRowComponent);
    this.componentRef = this.viewContainerRef.createComponent<GroupRowComponentBase<T>>(compFactory);
    this.componentRef.instance.columns = this.columns;
    this.componentRef.instance.row = this.row;
    this.init = true;
  }
}
