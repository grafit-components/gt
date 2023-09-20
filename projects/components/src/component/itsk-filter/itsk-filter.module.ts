import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskFilterPanelComponent} from './itsk-filter-panel/itsk-filter-panel.component';
import {FilterWrapperComponent} from './filter-wrapper/filter-wrapper.component';
import {DateFilterComponent} from './date-filter/date-filter.component';
import {ListFilterComponent} from './list-filter/list-filter.component';
import {NumericFilterComponent} from './numeric-filter/numeric-filter.component';
import {StringFilterComponent} from './string-filter/string-filter.component';
import {FormsModule} from '@angular/forms';
import {ItskCheckboxModule} from '../itsk-checkbox/itsk-checkbox.module';
import {ItskDatePickerModule} from '../itsk-date-picker/itsk-date-picker.module';
import {SelectFilterComponent} from './select-filter/select-filter.component';
import {VirtualSelectFilterComponent} from './virtual-select-filter/virtual-select-filter.component';
import {ItskSelectModule} from '../itsk-select/itsk-select.module';
import { MonthFilterComponent } from './month-filter/month-filter.component';
import { FilterGroupWrapperComponent } from './filter-group-wrapper/filter-group-wrapper.component';
import {ItskIconModule} from '../itsk-icon/itsk-icon.module';
import {ItskToggleModule} from '../itsk-toggle/itsk-toggle.module';
import {ItskDropdownModule} from '../itsk-dropdown/itsk-dropdown.module';

@NgModule({
  declarations: [
    ItskFilterPanelComponent,
    FilterWrapperComponent,
    DateFilterComponent,
    ListFilterComponent,
    NumericFilterComponent,
    StringFilterComponent,
    SelectFilterComponent,
    VirtualSelectFilterComponent,
    MonthFilterComponent,
    FilterGroupWrapperComponent
  ],
  exports: [
    ItskFilterPanelComponent,
    FilterWrapperComponent,
    DateFilterComponent,
    ListFilterComponent,
    NumericFilterComponent,
    StringFilterComponent,
    SelectFilterComponent,
    VirtualSelectFilterComponent
  ],
  imports: [
    FormsModule,
    ItskCheckboxModule,
    ItskDatePickerModule,
    CommonModule,
    ItskIconModule,
    ItskSelectModule,
    ItskToggleModule,
    ItskDropdownModule
  ]
})
export class ItskFilterModule {
}
