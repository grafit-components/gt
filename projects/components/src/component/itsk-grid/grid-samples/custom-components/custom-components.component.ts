import { Component, OnInit } from '@angular/core';
import { ItskIconService } from '../../../itsk-icon/itsk-icon.service';
import { FilterState } from '../../model/filter-state';
import { GridColumn } from '../../model/grid-column';
import { GridOfflineHelper } from '../../model/grid-offline-helper';
import { GridRow } from '../../model/grid-row';
import { FakeDataService } from '../fake-data.service';
import { ItskGridComponent } from '../../component/itsk-grid/itsk-grid.component';

@Component({
    selector: 'itsk-custom-components',
    templateUrl: './custom-components.component.html',
    styleUrls: ['./custom-components.component.scss'],
    imports: [ItskGridComponent]
})
export class CustomComponentsComponent implements OnInit {
  startData: any[];
  data: GridRow<any>[];
  columns: GridColumn[];
  state: FilterState = new FilterState();

  constructor(
    private fakeData: FakeDataService,
    private iconsService: ItskIconService,
  ) {
    this.iconsService.addSprite('assets/icon.svg');
    this.startData = fakeData.getData(100);
    this.columns = fakeData.getColumns();
  }

  stateChange(state: FilterState) {
    this.state = state;
    const filteredData = GridOfflineHelper.filterData(this.startData, this.state);
    const sortedData = GridOfflineHelper.sortData(filteredData, this.state);
    this.data = sortedData.map((_) => new GridRow<any>(_));
  }

  ngOnInit(): void {}
}
