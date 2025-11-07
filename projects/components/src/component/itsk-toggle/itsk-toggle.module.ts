import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskToggleComponent } from './itsk-toggle/itsk-toggle.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  exports: [ItskToggleComponent],
  imports: [CommonModule, ItskToggleComponent],
})
export class ItskToggleModule {}
