import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {GridColumn} from '../../itsk-grid/model/grid-column';
import {Observable} from 'rxjs';
import {ItskGridDictionary} from '../../itsk-grid/model/itsk-grid-dictionary';
import {GridUtil} from '../../itsk-grid/model/util';
import {FilterState} from '../../itsk-grid/model/filter-state';
import {ItskGridConfigService} from '../../itsk-grid/service/itsk-grid-config.service';
import {FilterBase} from '../model/filter-base';
import {StringFilter} from '../model/string-filter';
import {DateFilter} from '../model/date-filter';
import {NumericFilter} from '../model/numeric-filter';
import {ListFilter} from '../model/list-filter';
import {FilterColumn} from '../model/filter-column';
import {FilterGroupHelper} from '../filter-group-wrapper/filter-group-helper';
import {ItskFilterHelper} from '../model/itsk-filter-helper';

@Component({
  selector: 'itsk-filter-panel',
  templateUrl: './itsk-filter-panel.component.html',
  styleUrls: ['./itsk-filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskFilterPanelComponent implements OnInit, OnChanges {
  filters$: FilterColumn[];
  dict: Observable<ItskGridDictionary>;
  showActive: boolean;
  templates: any[];

  @HostBinding('class.filter-panel') css = true;

  @Input() cookieName: string;

  @Input()
  set columns(val: GridColumn[]) {
    this.filters$ = val;
  }

  state$: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
  }

  @Output() stateChange: EventEmitter<FilterState> = new EventEmitter();

  isLeaf = FilterGroupHelper.isLeaf;
  hasFilterableLeafs = FilterGroupHelper.hasFilterableLeafs;

  showFilter = ItskFilterHelper.showFilter;

  constructor(private config$: ItskGridConfigService) {
    this.dict = this.config$.dict;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {
    this.templates = this.getTemplates(this.cookieName);
  }

  applyFilters() {
    this.setState(this.state$);
  }

  clearAll() {
    this.state$.clear();
    this.setState(this.state$);
  }

  private setState(state: FilterState) {
    this.state$ = new FilterState(state);
    this.state$.save(this.cookieName);
    this.stateChange.emit(this.state$);
  }

  private getTemplates(cookieName: string) {
    const cookie = localStorage.getItem(this.cookieName);
    console.log(cookie);
    return [];
  }

  filterChanged(filter: FilterBase | StringFilter | DateFilter | NumericFilter | ListFilter) {
    if (filter instanceof StringFilter) {
      this.state$.addStringFilter(filter);
    }
    if (filter instanceof DateFilter) {
      this.state$.addDateFilter(filter);
    }
    if (filter instanceof NumericFilter) {
      this.state$.addNumericFilter(filter);
    }
    if (filter instanceof ListFilter) {
      this.state$.addListFilter(filter);
    }
  }
}
