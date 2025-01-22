import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskClickOutsideModule } from '../../directive/itsk-click-outside/itsk-click-outside.module';
import { ItskFocusModule } from '../../directive/itsk-focus/itsk-focus.module';
import { ItskPrependZeroPipeModule } from '../../pipe/itsk-prepend-zero/itsk-prepend-zero-pipe.module';
import { ItskDropdownModule } from '../itsk-dropdown/itsk-dropdown.module';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskDateInputComponent } from './itsk-date-input/itsk-date-input.component';
import { ItskDatePickerComponent } from './itsk-date-picker/itsk-date-picker.component';
import { ItskDaySelectorComponent } from './itsk-day-selector/itsk-day-selector.component';
import { ItskMonthPickerComponent } from './itsk-month-picker/itsk-month-picker.component';
import { ItskMonthSelectorComponent } from './itsk-month-selector/itsk-month-selector.component';
import { ItskTimeInputComponent } from './itsk-time-input/itsk-time-input.component';
import { ItskYearSelectorComponent } from './itsk-year-selector/itsk-year-selector.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ItskClickOutsideModule,
        ItskFocusModule,
        ItskDropdownModule,
        ItskPrependZeroPipeModule,
        ItskIconModule,
        ItskMonthSelectorComponent,
        ItskMonthPickerComponent,
        ItskYearSelectorComponent,
        ItskDatePickerComponent,
        ItskDaySelectorComponent,
        ItskDateInputComponent,
        ItskTimeInputComponent,
    ],
    exports: [
        ItskMonthSelectorComponent,
        ItskMonthPickerComponent,
        ItskYearSelectorComponent,
        ItskDatePickerComponent,
        ItskDaySelectorComponent,
        ItskDateInputComponent,
        ItskTimeInputComponent,
    ],
})
export class ItskDatePickerModule {}
