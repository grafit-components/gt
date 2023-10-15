import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskTreeSelectComponent} from './itsk-select/itsk-tree-select.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {ItskDropdownModule} from '../itsk-dropdown/itsk-dropdown.module';
import {ItskTreeSelectValueDirective} from './directive/itsk-tree-select-value.directive';
import {ItskTreeSelectOptionDirective} from './directive/itsk-tree-select-option.directive';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import {ItskTreeModule} from '../itsk-tree/itsk-tree.module';

@NgModule({
  declarations: [
    ItskTreeSelectComponent,
    ItskTreeSelectValueDirective,
    ItskTreeSelectOptionDirective],
  imports: [
    CommonModule,
    ItskDropdownModule,
    FormsModule,
    ScrollingModule,
    ItskIconModule,
    ItskTreeModule
  ],
  exports: [
    ItskTreeSelectComponent,
    ItskTreeSelectValueDirective,
    ItskTreeSelectOptionDirective
  ]
})
export class ItskTreeSelectModule {
}
