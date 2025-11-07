import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskRadioButtonComponent } from './itsk-radio-button/itsk-radio-button.component';
import { ItskRadioComponent } from './itsk-radio/itsk-radio.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  imports: [CommonModule, ItskRadioComponent, ItskRadioButtonComponent],
  exports: [ItskRadioComponent, ItskRadioButtonComponent],
})
export class ItskRadioModule {}
