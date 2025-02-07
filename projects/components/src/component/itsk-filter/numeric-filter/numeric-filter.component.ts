import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterState } from '../../itsk-grid/model/filter-state';
import { FilterBase } from '../model/filter-base';
import { FilterColumn } from '../model/filter-column';
import { FilterComponentBase } from '../model/filter-component-base';
import { NumericFilter } from '../model/numeric-filter';
import { NumericFilterValue } from '../model/numeric-filter-value';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'itsk-numeric-filter',
    templateUrl: './numeric-filter.component.html',
    styleUrls: ['./numeric-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule]
})
export class NumericFilterComponent extends FilterComponentBase implements OnInit {
  filter: NumericFilter = new NumericFilter();

  @Input() column: FilterColumn = new FilterColumn();
  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter<FilterBase>();

  private state$: FilterState = new FilterState();

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
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

  private getFilter(): NumericFilter {
    let filter = this.state.numericFilters.find((f) => {
      return f.fieldName === this.column.filterField;
    });
    if (filter === null || filter === undefined) {
      filter = this.state.addNumericFilter(
        new NumericFilter({
          value: new NumericFilterValue(),
          fieldName: this.column.filterField,
          name: this.column.name,
        }),
      );
    }
    return filter;
  }
}
