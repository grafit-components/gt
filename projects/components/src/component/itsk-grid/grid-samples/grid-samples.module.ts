import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ItskGridModule } from '../itsk-grid.module';
import { BasicComponent } from './basic/basic.component';
import { CustomComponentsComponent } from './custom-components/custom-components.component';
import { GroupingGridComponent } from './grouping-grid/grouping-grid.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

@NgModule({
  declarations: [BasicComponent, GroupingGridComponent, TreeGridComponent, CustomComponentsComponent],
  exports: [BasicComponent, GroupingGridComponent, TreeGridComponent, CustomComponentsComponent],
  imports: [CommonModule, ItskGridModule, HttpClientModule],
})
export class GridSamplesModule {}
