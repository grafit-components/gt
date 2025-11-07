import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDropdownModule } from '../itsk-dropdown/itsk-dropdown.module';
import { ItskSharedModule } from '../itsk-shared/itsk-shared.module';
import { ItskAutocompleteComponent } from './itsk-autocomplete/itsk-autocomplete.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  exports: [ItskAutocompleteComponent],
  imports: [CommonModule, FormsModule, ItskDropdownModule, ScrollingModule, ItskSharedModule, ItskAutocompleteComponent],
})
export class ItskAutocompleteModule {}
