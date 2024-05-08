import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskRadioButtonComponent } from './itsk-radio-button/itsk-radio-button.component';
import { ItskRadioComponent } from './itsk-radio/itsk-radio.component';

@NgModule({
  declarations: [ItskRadioComponent, ItskRadioButtonComponent],
  imports: [CommonModule],
  exports: [ItskRadioComponent, ItskRadioButtonComponent],
})
export class ItskRadioModule {}
