import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterState} from '../../itsk-grid/model/filter-state';
import {FilterColumn} from '../model/filter-column';
import {FilterGroupHelper} from './filter-group-helper';
import {FilterBase} from '../model/filter-base';
import {ItskFilterHelper} from '../model/itsk-filter-helper';

@Component({
  selector: 'itsk-filter-group-wrapper',
  templateUrl: './filter-group-wrapper.component.html',
  styleUrls: ['./filter-group-wrapper.component.scss']
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

  constructor() {
  }

  ngOnInit(): void {
  }

  filterChange(filter: FilterBase) {
    this.filterChanged.emit(filter);
  }
}
