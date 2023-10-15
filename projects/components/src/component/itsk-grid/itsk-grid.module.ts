import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeadCellComponent} from './component/cell/head-cell/head-cell.component';
import {NumericCellComponent} from './component/cell/numeric-cell/numeric-cell.component';
import {ListCellComponent} from './component/cell/list-cell/list-cell.component';
import {DateCellComponent} from './component/cell/date-cell/date-cell.component';
import {DefaultCellComponent} from './component/cell/default-cell/default-cell.component';
import {FocusCellComponent} from './component/cell/focus-cell/focus-cell.component';
import {ItskGridComponent} from './component/itsk-grid/itsk-grid.component';
import {GroupRowDefaultComponent} from './component/row/group-row-default/group-row-default.component';
import {ItskPagerModule} from '../itsk-pager/itsk-pager.module';
import {ItskGridPanelComponent} from './component/itsk-grid-panel/itsk-grid-panel.component';
// import {ItskGridFilterComponent} from './component/itsk-grid-filter/itsk-grid-filter.component';
import {ItskGridDetailComponent} from './component/itsk-grid-detail/itsk-grid-detail.component';
import {ItskGridHeadComponent} from './component/itsk-grid-head/itsk-grid-head.component';
import {ItskGridBodyComponent} from './component/itsk-grid-body/itsk-grid-body.component';
import {ItskGridCellComponent} from './component/cell/itsk-grid-cell/itsk-grid-cell.component';
import {FormsModule} from '@angular/forms';
import {ItskNumberPipeModule} from '../../pipe/itsk-number-pipe/itsk-number-pipe.module';
import {DefaultHeadCellComponent} from './component/cell/default-head-cell/default-head-cell.component';
import {GridColumnsSettingsComponent} from './component/grid-columns-settings/grid-columns-settings.component';
import {ItskDatePickerModule} from '../itsk-date-picker/itsk-date-picker.module';
import {ItskCheckboxModule} from '../itsk-checkbox/itsk-checkbox.module';
import {ItskGridHeadDropdownComponent} from './component/itsk-grid-head-dropdown/itsk-grid-head-dropdown.component';
import {ItskClickOutsideModule} from '../../directive/itsk-click-outside/itsk-click-outside.module';
import {ItskGridHeadCellComponent} from './component/itsk-grid-head-cell/itsk-grid-head-cell.component';
import {ItskTooltipModule} from '../../directive/itsk-tooltip/itsk-tooltip.module';
import {GridPanelButtonDirective} from './directive/grid-panel-button.directive';
import {GridPanelContentDirective} from './directive/grid-panel-content.directive';
import {GridCustomPanelDirective} from './directive/grid-custom-panel.directive';
import {ItskToggleModule} from '../itsk-toggle/itsk-toggle.module';
import {ItskGridAdditionalComponent} from './component/itsk-grid-additional/itsk-grid-additional.component';
import {ItskGridHeadGroupComponent} from './component/itsk-grid-head-group/itsk-grid-head-group.component';
import {ItskTreeModule} from '../itsk-tree/itsk-tree.module';
import {TemplateCellComponent} from './component/cell/template-cell/template-cell.component';
import {ItskGridAggregateComponent} from './component/itsk-grid-aggregate/itsk-grid-aggregate.component';
// tslint:disable-next-line:max-line-length
import {ItskGridAggregateWrapperComponent} from './component/itsk-grid-aggregate/itsk-grid-aggregate-wrapper/itsk-grid-aggregate-wrapper.component';
import {ItskGridWrapperComponent} from './component/itsk-grid-wrapper/itsk-grid-wrapper.component';
import {ItskTabsModule} from '../itsk-tabs/itsk-tabs.module';
import {ItskDropdownModule} from '../itsk-dropdown/itsk-dropdown.module';
import {ItskSelectModule} from '../itsk-select/itsk-select.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DatetimeCellComponent} from './component/cell/datetime-cell/datetime-cell.component';
import {MonthCellComponent} from './component/cell/month-cell/month-cell.component';
import {YearCellComponent} from './component/cell/year-cell/year-cell.component';
import {ItskFilterModule} from '../itsk-filter/itsk-filter.module';
import {ItskHintModule} from '../../directive/itsk-hint/itsk-hint.module';
import {GroupRowWrapperComponent} from './component/row/group-row-wrapper/group-row-wrapper.component';
import {ItskGridExpandComponent} from './component/itsk-grid-expand/itsk-grid-expand.component';
import {ItskGridCellWrapperComponent} from './component/cell/itsk-grid-cell-wrapper/itsk-grid-cell-wrapper.component';
import {ItskIconModule} from '../itsk-icon/itsk-icon.module';

@NgModule({
    declarations: [
        HeadCellComponent,
        NumericCellComponent,
        ListCellComponent,
        DateCellComponent,
        DefaultCellComponent,
        FocusCellComponent,
        ItskGridComponent,
        GroupRowDefaultComponent,
        ItskGridPanelComponent,
        // ItskGridFilterComponent,
        ItskGridDetailComponent,
        ItskGridHeadComponent,
        ItskGridBodyComponent,
        ItskGridCellComponent,
        DefaultHeadCellComponent,
        GridColumnsSettingsComponent,
        ItskGridHeadDropdownComponent,
        ItskGridHeadCellComponent,
        GridPanelButtonDirective,
        GridPanelContentDirective,
        GridCustomPanelDirective,
        ItskGridAdditionalComponent,
        ItskGridHeadGroupComponent,
        TemplateCellComponent,
        ItskGridAggregateComponent,
        ItskGridAggregateWrapperComponent,
        ItskGridWrapperComponent,
        DatetimeCellComponent,
        MonthCellComponent,
        YearCellComponent,
        GroupRowWrapperComponent,
        ItskGridExpandComponent,
        ItskGridCellWrapperComponent
    ],
    exports: [
        NumericCellComponent,
        ListCellComponent,
        DateCellComponent,
        DefaultCellComponent,
        FocusCellComponent,
        ItskGridComponent,
        GridColumnsSettingsComponent,
        GroupRowDefaultComponent,
        GridPanelButtonDirective,
        GridPanelContentDirective,
        GridCustomPanelDirective,
        ItskGridWrapperComponent
    ],
    imports: [
        CommonModule,
        ItskPagerModule,
        FormsModule,
        ItskNumberPipeModule,
        ItskCheckboxModule,
        ItskDatePickerModule,
        ItskHintModule,
        ItskTooltipModule,
        ItskClickOutsideModule,
        ItskToggleModule,
        ItskTreeModule,
        ItskTabsModule,
        ItskDropdownModule,
        ItskSelectModule,
        ScrollingModule,
        ItskFilterModule,
        ItskIconModule
    ]
})
export class ItskGridModule {
}
