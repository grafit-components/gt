import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { FilterState } from '../../itsk-grid/model/filter-state';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { ListFilterComponent } from '../list-filter/list-filter.component';
import { FilterType } from '../model/enum/filter-type.enum';
import { FilterBase } from '../model/filter-base';
import { FilterColumn } from '../model/filter-column';
import { FilterComponentBase } from '../model/filter-component-base';
import { NumericFilterComponent } from '../numeric-filter/numeric-filter.component';
import { StringFilterComponent } from '../string-filter/string-filter.component';

@Component({
    selector: 'itsk-filter-wrapper',
    template: '',
    styleUrls: ['./filter-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FilterWrapperComponent implements OnInit, OnDestroy, OnChanges {
  private subs = true;
  private column$: FilterColumn = new FilterColumn();

  @Input()
  set column(val: FilterColumn) {
    this.column$ = val;
    if (this.init && this.componentRef) {
      this.componentRef.instance.filterField = this.column$;
      this.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }

  private state$: FilterState = new FilterState();

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    if (this.init && this.componentRef) {
      this.componentRef.instance.state = this.state$;
      this.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }

  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter();

  private componentRef?: ComponentRef<any>;
  private init: boolean = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  private getFilterComponent(column: FilterColumn) {
    if (
      column.filterComponent === null ||
      column.filterComponent === undefined ||
      !FilterComponentBase.isPrototypeOf(column.filterComponent)
    ) {
      switch (column.filterType) {
        case FilterType.Number:
          return NumericFilterComponent;
        case FilterType.List:
          return ListFilterComponent;
        case FilterType.Date:
          return DateFilterComponent;
        default:
          return StringFilterComponent;
      }
    }
    return column.filterComponent;
  }

  ngOnInit() {
    this.column$.filterComponent = this.getFilterComponent(this.column$);
    const compFactory = this.componentFactoryResolver.resolveComponentFactory<FilterComponentBase>(this.column$.filterComponent);
    this.componentRef = this.viewContainerRef.createComponent<FilterComponentBase>(compFactory);
    this.componentRef.instance.column = this.column$;
    this.componentRef.instance.state = this.state$;
    this.init = true;
    this.componentRef.instance.filterChanged.pipe(takeWhile((_) => this.subs)).subscribe((filter: FilterBase) => {
      this.filterChanged.emit(filter);
    });
  }

  ngOnDestroy() {
    this.subs = false;
  }
}
