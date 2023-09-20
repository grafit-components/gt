import {GridRow, IId} from '../grid-row';
import { OnInit, Directive } from '@angular/core';
import {GridColumn} from '../grid-column';
import {Observable} from 'rxjs';
import {GridPageServiceBase} from '../service/grid-page-service-base';
import {GridResponse} from '../grid-response';
import {FilterState} from '../filter-state';
import {Paging} from '../../../itsk-pager/model/paging';

@Directive()
export class GridPageBase<T extends IId> implements OnInit {
  state: FilterState;
  paging: Paging;
  columns: GridColumn[];
  data: GridRow<T>[] = [];
  dataTransport: Observable<boolean>;
  row: GridRow<T>;

  constructor(protected svc$: GridPageServiceBase<T>) {
  }

  ngOnInit() {
    this.svc$.data.subscribe((res: GridResponse<T>) => {
      this.data = res.result;
      this.paging = new Paging(res.paging);
      if (this.data && this.data.length > 0) {
        this.selectRow(this.data[0]);
      }
    });

    setTimeout(() => {
      this.dataTransport = this.svc$.dataTransport;
    });
  }

  rowSelected(row: GridRow<T>) {
    if (!this.row || this.row.data.id !== row.data.id) {
      this.selectRow(row);
    }
  }

  rowDoubleClicked = (row: GridRow<T>) => {

  }

  selectRow(row: GridRow<T>) {
    this.row = row;
  }

  addRow() {
    this.startEdit();
    let newRow = this.data.find((row) => {
      return row.id === 0 || !row.id;
    });
    if (!newRow) {
      newRow = new GridRow({
        id: null
      });
      newRow.edit = true;
      this.data.unshift(newRow);
    }
    this.selectRow(newRow);
  }

  deleteRow = (row: GridRow<T>) => {
    if (this.data) {
      const index = this.data.indexOf(row);
      if (index > -1) {
        this.data.splice(index, 1);
      }
    }
  }

  startEdit = () => {
    this.data.map((item) => {
      item.edit = false;
    });
  }
}
