import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskDisableControlDirective } from './itsk-disable-control.directive';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  exports: [ItskDisableControlDirective],
  imports: [CommonModule, ItskDisableControlDirective],
})
export class ItskDisableControlModule {}
