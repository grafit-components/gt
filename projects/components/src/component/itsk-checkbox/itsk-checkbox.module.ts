import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskCheckboxComponent } from './itsk-checkbox/itsk-checkbox.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  exports: [ItskCheckboxComponent],
  imports: [CommonModule, ItskIconModule, ItskCheckboxComponent],
})
export class ItskCheckboxModule {}
