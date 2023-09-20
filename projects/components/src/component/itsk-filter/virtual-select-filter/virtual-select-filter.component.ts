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
import {ListFilter} from '../model/list-filter';
import {FilterColumn} from '../model/filter-column';
import {FilterBase} from '../model/filter-base';
import {FilterState} from '../../itsk-grid/model/filter-state';
import {ListFilterType} from '../model/enum/list-filter-type.enum';

@Component({
  selector: 'itsk-virtual-select-filter',
  templateUrl: './virtual-select-filter.component.html',
  styleUrls: ['./virtual-select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualSelectFilterComponent extends FilterComponentBase implements OnInit {
  filter: ListFilter;

  @Input() column: FilterColumn;
  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter<FilterBase>();

  state$: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
  }

  get state() {
    return this.state$;
  }

  excluded: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
  }

  setType() {
    this.excluded = !this.excluded;
    this.filter.type = this.excluded ? ListFilterType.Excluded : ListFilterType.None;
  }

  setFilter(value: any[]) {
    this.filter.value = value;
    this.filterChanged.emit(this.filter);
  }

  private getFilter(): ListFilter {
    let filter = this.state.listFilters.find((f) => {
      return f.fieldName === this.column.filterField;
    });
    if (!filter) {
      filter = this.state.addListFilter(new ListFilter({
        fieldName: this.column.filterField,
        value: [],
        type: this.column.listFilterType,
        name: this.column.name
      }));
    }
    this.excluded = filter.type === ListFilterType.Excluded;
    return filter;
  }
}
