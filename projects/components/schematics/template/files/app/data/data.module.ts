import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskFilterModule, ItskGridModule, ItskTabsModule } from '@grafit/angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { DataChartComponent } from './data-chart/data-chart.component';
import { BoolCellComponent } from './data-grid/bool-cell/bool-cell.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataLayoutComponent } from './data-layout/data-layout.component';
import { DataRoutingModule } from './data-routing.module';

@NgModule({
  declarations: [DataLayoutComponent, DataGridComponent, DataChartComponent, BoolCellComponent],
  imports: [CommonModule, DataRoutingModule, ItskFilterModule, ItskTabsModule, FormsModule, ItskGridModule, HighchartsChartModule],
})
export class DataModule {}
