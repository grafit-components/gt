import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDropdownModule } from '../itsk-dropdown/itsk-dropdown.module';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskSharedModule } from '../itsk-shared/itsk-shared.module';
import { ItskSelectOptionDirective } from './directive/itsk-select-option.directive';
import { ItskSelectValueDirective } from './directive/itsk-select-value.directive';
import { ItskSelectComponent } from './itsk-select/itsk-select.component';

@NgModule({
  declarations: [ItskSelectComponent, ItskSelectValueDirective, ItskSelectOptionDirective],
  imports: [CommonModule, ItskDropdownModule, FormsModule, ScrollingModule, ItskIconModule, ItskSharedModule],
  exports: [ItskSelectComponent, ItskSelectValueDirective, ItskSelectOptionDirective],
})
export class ItskSelectModule {}
