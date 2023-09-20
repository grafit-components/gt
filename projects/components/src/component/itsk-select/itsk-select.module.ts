import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskSelectComponent} from './itsk-select/itsk-select.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {ItskDropdownModule} from '../itsk-dropdown/itsk-dropdown.module';
import {ItskSelectValueDirective} from './directive/itsk-select-value.directive';
import {ItskSelectOptionDirective} from './directive/itsk-select-option.directive';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import {ItskSharedModule} from '../itsk-shared/itsk-shared.module';

@NgModule({
  declarations: [
    ItskSelectComponent,
    ItskSelectValueDirective,
    ItskSelectOptionDirective],
  imports: [
    CommonModule,
    ItskDropdownModule,
    FormsModule,
    ScrollingModule,
    ItskIconModule,
    ItskSharedModule
  ],
  exports: [
    ItskSelectComponent,
    ItskSelectValueDirective,
    ItskSelectOptionDirective
  ]
})
export class ItskSelectModule {
}
