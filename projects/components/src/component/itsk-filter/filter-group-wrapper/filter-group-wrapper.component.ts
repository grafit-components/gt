import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterState } from '../../itsk-grid/model/filter-state';
import { FilterBase } from '../model/filter-base';
import { FilterColumn } from '../model/filter-column';
import { ItskFilterHelper } from '../model/itsk-filter-helper';
import { FilterGroupHelper } from './filter-group-helper';

import { FilterWrapperComponent } from '../filter-wrapper/filter-wrapper.component';

@Component({
    selector: 'itsk-filter-group-wrapper',
    templateUrl: './filter-group-wrapper.component.html',
    styleUrls: ['./filter-group-wrapper.component.scss'],
    imports: [FilterWrapperComponent]
})
export class FilterGroupWrapperComponent implements OnInit {
  @Input()
  column?: FilterColumn;

  @Input()
  state?: FilterState;

  @Input() showActive: boolean = false;

  @Output() filterChanged: EventEmitter<FilterBase> = new EventEmitter();

  isLeaf = FilterGroupHelper.isLeaf;
  hasFilterableLeafs = FilterGroupHelper.hasFilterableLeafs;

  showFilter = ItskFilterHelper.showFilter;

  constructor() {}

  ngOnInit(): void {}

  filterChange(filter: FilterBase) {
    this.filterChanged.emit(filter);
  }
}
