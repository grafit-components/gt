import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ItskGridModule } from '../itsk-grid.module';
import { BasicComponent } from './basic/basic.component';
import { CustomComponentsComponent } from './custom-components/custom-components.component';
import { GroupingGridComponent } from './grouping-grid/grouping-grid.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

@NgModule({
    exports: [BasicComponent, GroupingGridComponent, TreeGridComponent, CustomComponentsComponent], imports: [CommonModule, ItskGridModule, BasicComponent, GroupingGridComponent, TreeGridComponent, CustomComponentsComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class GridSamplesModule {}
