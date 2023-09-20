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
import {DateFilterValue} from '../model/date-filter-value';
import {FilterState} from '../../itsk-grid/model/filter-state';
import {FilterBase} from '../model/filter-base';
import {FilterColumn} from '../model/filter-column';

@Component({
  selector: 'itsk-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateFilterComponent extends FilterComponentBase implements OnInit {
  filter: DateFilter;

  @Input() column: FilterColumn;
  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter<FilterBase>();

  state$: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
    this.changeDetector.markForCheck();
  }

  get state() {
    return this.state$;
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
