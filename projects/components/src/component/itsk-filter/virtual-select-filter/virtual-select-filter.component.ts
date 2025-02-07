import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterState } from '../../itsk-grid/model/filter-state';
import { ListFilterType } from '../model/enum/list-filter-type.enum';
import { FilterBase } from '../model/filter-base';
import { FilterColumn } from '../model/filter-column';
import { FilterComponentBase } from '../model/filter-component-base';
import { ListFilter } from '../model/list-filter';
import { ItskIconComponent } from '../../itsk-icon/itsk-icon/itsk-icon.component';

import { ItskSelectComponent } from '../../itsk-select/itsk-select/itsk-select.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'itsk-virtual-select-filter',
    templateUrl: './virtual-select-filter.component.html',
    styleUrls: ['./virtual-select-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskIconComponent, ItskSelectComponent, FormsModule]
})
export class VirtualSelectFilterComponent extends FilterComponentBase implements OnInit {
  filter?: ListFilter;

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

  excluded: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}

  setType() {
    this.excluded = !this.excluded;
    if (this.filter) this.filter.type = this.excluded ? ListFilterType.Excluded : ListFilterType.None;
  }

  setFilter(value: any[]) {
    if (this.filter) this.filter.value = value;
    this.filterChanged.emit(this.filter);
  }

  private getFilter(): ListFilter {
    let filter = this.state.listFilters.find((f) => {
      return f.fieldName === this.column.filterField;
    });
    if (!filter) {
      filter = this.state.addListFilter(
        new ListFilter({
          fieldName: this.column.filterField,
          value: [],
          type: this.column.listFilterType,
          name: this.column.name,
        }),
      );
    }
    this.excluded = filter.type === ListFilterType.Excluded;
    return filter;
  }
}
