import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterState } from '../../itsk-grid/model/filter-state';
import { FilterBase } from '../model/filter-base';
import { FilterColumn } from '../model/filter-column';
import { FilterComponentBase } from '../model/filter-component-base';
import { StringFilter } from '../model/string-filter';

@Component({
    selector: 'itsk-string-filter',
    templateUrl: './string-filter.component.html',
    styleUrls: ['./string-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class StringFilterComponent extends FilterComponentBase implements OnInit {
  filter: StringFilter = new StringFilter();

  @Input() column: FilterColumn = new FilterColumn();
  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter<FilterBase>();

  state$: FilterState = new FilterState();

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

  ngOnInit() {}

  setFilter() {
    this.filterChanged.emit(this.filter);
  }

  private getFilter(): StringFilter {
    let filter = this.state.stringFilters.find((f) => {
      return f.fieldName === this.column.filterField;
    });
    if (!filter) {
      filter = this.state.addStringFilter(
        new StringFilter({
          value: '',
          fieldName: this.column.filterField,
          type: this.column.stringFilterType,
          name: this.column.name,
        }),
      );
    }
    if (this.column.stringFilterType !== undefined) filter.type = this.column.stringFilterType;
    return filter;
  }
}
