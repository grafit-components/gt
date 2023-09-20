import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicComponent} from './basic/basic.component';
import {GroupingGridComponent} from './grouping-grid/grouping-grid.component';
import {TreeGridComponent} from './tree-grid/tree-grid.component';
import {CustomComponentsComponent} from './custom-components/custom-components.component';
import {ItskGridModule} from '../itsk-grid.module';
import {DateFilterComponent} from '../../itsk-filter/date-filter/date-filter.component';
import {ListFilterComponent} from '../../itsk-filter/list-filter/list-filter.component';
import {NumericFilterComponent} from '../../itsk-filter/numeric-filter/numeric-filter.component';
import {StringFilterComponent} from '../../itsk-filter/string-filter/string-filter.component';
import {SelectFilterComponent} from '../../itsk-filter/select-filter/select-filter.component';
import {VirtualSelectFilterComponent} from '../../itsk-filter/virtual-select-filter/virtual-select-filter.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        BasicComponent,
        GroupingGridComponent,
        TreeGridComponent,
        CustomComponentsComponent
    ],
    exports: [
        BasicComponent,
        GroupingGridComponent,
        TreeGridComponent,
        CustomComponentsComponent
    ],
    imports: [
        CommonModule,
        ItskGridModule,
        HttpClientModule
    ]
})
export class GridSamplesModule {
}
