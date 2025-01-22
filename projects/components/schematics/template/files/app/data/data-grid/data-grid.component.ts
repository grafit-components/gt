import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterState, GridColumn, GridOfflineHelper, GridRow } from '@grafit/angular';
import { DataModel } from '../../model/data-model';
import { DataService } from '../../service/data.service';

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.styl'],
    standalone: false
})
export class DataGridComponent implements OnInit {
  @Input() config: GridColumn[] = [];
  state$: FilterState = new FilterState();

  @Input()
  set state(value: FilterState) {
    this.state$ = value;
    this.filterData();
  }

  get state() {
    return this.state$;
  }

  @Output() stateChange: EventEmitter<FilterState> = new EventEmitter<FilterState>();

  data: DataModel[] = [];
  filtered: GridRow<DataModel>[] = [];

  constructor(private svc: DataService) {
    this.svc.data.subscribe((_) => {
      this.data = _;
      this.filterData();
    });
  }

  setState(state: FilterState) {
    this.state = state;
    this.stateChange.emit(this.state);
  }

  filterData() {
    let result = GridOfflineHelper.filterData(this.data, this.state);
    result = GridOfflineHelper.sortData(result, this.state);
    this.filtered = result.map((_) => new GridRow<DataModel>(_));
  }

  ngOnInit(): void {}
}
