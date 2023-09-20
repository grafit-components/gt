import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FakeDataService} from '../fake-data.service';
import {GridRow} from '../../model/grid-row';
import {GridColumn} from '../../model/grid-column';
import {FilterState} from '../../model/filter-state';
import {GridOfflineHelper} from '../../model/grid-offline-helper';
import {ItskIconService} from '../../../itsk-icon/itsk-icon.service';
import {ItskGridEditType} from '../../model/enum/itsk-grid-edit-type.enum';
import {ItskGridEditEvent} from '../../model/enum/itsk-grid-edit-event.enum';
import {ItskGridSelectType} from '../../model/enum/itsk-grid-select-type';
import {ItskGridSelectRowsByType} from '../../model/enum/itsk-grid-select-rows-by-type';

@Component({
  selector: 'itsk-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  startData: any[];
  data: GridRow<any>[];
  columns: GridColumn[];
  state: FilterState = new FilterState();

  @Input() virtual: boolean;
  @Input() selectType: ItskGridSelectType;
  @Input() selectRowsBy: ItskGridSelectRowsByType;
  @Input() editType: ItskGridEditType;
  @Input() editEvent: ItskGridEditEvent;

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fakeData: FakeDataService,
              private iconsService: ItskIconService) {
    this.iconsService.addSprite('assets/icon.svg');
    this.startData = fakeData.getData(100);
    this.columns = fakeData.getColumns();
  }

  stateChange(state: FilterState) {
    this.state = state;
    const filteredData = GridOfflineHelper.filterData(this.startData, this.state);
    const sortedData = GridOfflineHelper.sortData(filteredData, this.state);
    this.data = sortedData.map(_ => new GridRow<any>(_));
  }

  emit(name: any, value: any) {
    this.action.emit({name, value});
  }

  ngOnInit(): void {
  }
}
