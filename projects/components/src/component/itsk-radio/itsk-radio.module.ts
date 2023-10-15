import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItskRadioComponent } from './itsk-radio/itsk-radio.component';
import { ItskRadioButtonComponent } from './itsk-radio-button/itsk-radio-button.component';

@NgModule({
  declarations: [ItskRadioComponent, ItskRadioButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [ItskRadioComponent, ItskRadioButtonComponent]
})
export class ItskRadioModule { }
