import { Component, OnInit } from '@angular/core';
import { FilterState, GridColumn } from '@grafit/angular';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-data-layout',
  templateUrl: './data-layout.component.html',
  styleUrls: ['./data-layout.component.styl'],
})
export class DataLayoutComponent implements OnInit {
  config: GridColumn[];
  state: FilterState = new FilterState();

  showFilters: boolean = true;

  dataSize: number = 500;

  constructor(private svc: DataService) {
    this.config = this.svc.getConfig();
  }

  ngOnInit(): void {}

  create() {
    this.svc.createData(this.dataSize);
  }
}
