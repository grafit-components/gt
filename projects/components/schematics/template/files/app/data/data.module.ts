import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataLayoutComponent} from "./data-layout/data-layout.component";
import {DataGridComponent} from "./data-grid/data-grid.component";
import {DataChartComponent} from "./data-chart/data-chart.component";
import {DataRoutingModule} from "./data-routing.module";
import {ItskFilterModule, ItskGridModule, ItskTabsModule} from "@grafit/angular";
import {FormsModule} from "@angular/forms";
import {BoolCellComponent} from './data-grid/bool-cell/bool-cell.component';
import {HighchartsChartModule} from "highcharts-angular";

@NgModule({
  declarations: [
    DataLayoutComponent,
    DataGridComponent,
    DataChartComponent,
    BoolCellComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    ItskFilterModule,
    ItskTabsModule,
    FormsModule,
    ItskGridModule,
    HighchartsChartModule
  ]
})
export class DataModule {
}
