import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FilterComponentBase} from '../model/filter-component-base';
import {DateFilter} from '../model/date-filter';
import {FilterColumn} from '../model/filter-column';
import {FilterBase} from '../model/filter-base';
import {FilterState} from '../../itsk-grid/model/filter-state';
import {DateFilterValue} from '../model/date-filter-value';
import {GridColumn} from "../../itsk-grid/model/grid-column";

@Component({
  selector: 'itsk-month-filter',
  templateUrl: './month-filter.component.html',
  styleUrls: ['./month-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthFilterComponent extends FilterComponentBase implements OnInit {
  filter: DateFilter = this.getFilter();

  @Input() column: FilterColumn = new FilterColumn();
  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter<FilterBase>();

  state$?: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
    this.changeDetector.markForCheck();
  }

  get state() {
    return this.state$ as any;
  }

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.filter = this.getFilter();
  }

  private getFilter(): DateFilter {
    let filter = this.state.dateFilters.find((f) => {
      return f.fieldName === this.column.filterField;
    });
    if (filter === null || filter === undefined) {
      filter = this.state.addDateFilter(new DateFilter({
        value: new DateFilterValue(),
        fieldName: this.column.filterField,
        name: this.column.name
      }));
    }
    return filter;
  }
}
