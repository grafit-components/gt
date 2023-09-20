import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskCheckboxComponent} from './itsk-checkbox/itsk-checkbox.component';
import {ItskIconModule} from '../itsk-icon/itsk-icon.module';

@NgModule({
  declarations: [
    ItskCheckboxComponent
  ],
  exports: [
    ItskCheckboxComponent
  ],
  imports: [
    CommonModule,
    ItskIconModule
  ]
})
export class ItskCheckboxModule {
}
