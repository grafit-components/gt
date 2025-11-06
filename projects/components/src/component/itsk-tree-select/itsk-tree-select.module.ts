import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDropdownModule } from '../itsk-dropdown/itsk-dropdown.module';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskTreeModule } from '../itsk-tree/itsk-tree.module';
import { ItskTreeSelectOptionDirective } from './directive/itsk-tree-select-option.directive';
import { ItskTreeSelectValueDirective } from './directive/itsk-tree-select-value.directive';
import { ItskTreeSelectComponent } from './itsk-select/itsk-tree-select.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  imports: [
    CommonModule,
    ItskDropdownModule,
    FormsModule,
    ScrollingModule,
    ItskIconModule,
    ItskTreeModule,
    ItskTreeSelectComponent,
    ItskTreeSelectValueDirective,
    ItskTreeSelectOptionDirective,
  ],
  exports: [ItskTreeSelectComponent, ItskTreeSelectValueDirective, ItskTreeSelectOptionDirective],
})
export class ItskTreeSelectModule {}
