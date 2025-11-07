import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskClickOutsideDirective } from './itsk-click-outside.directive';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  imports: [CommonModule, ItskClickOutsideDirective],
  exports: [ItskClickOutsideDirective],
})
export class ItskClickOutsideModule {}
