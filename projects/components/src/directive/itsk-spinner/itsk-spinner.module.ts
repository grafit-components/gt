import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskSpinnerOverlayComponent } from './itsk-spinner-overlay/itsk-spinner-overlay.component';
import { ItskSpinnerDirective } from './itsk-spinner.directive';
import { ItskSpinnerComponent } from './itsk-spinner/itsk-spinner.component';

/** @deprecated Использовать импорт компонентов */
@NgModule({
  imports: [CommonModule, ItskSpinnerDirective, ItskSpinnerComponent, ItskSpinnerOverlayComponent],
  exports: [ItskSpinnerDirective, ItskSpinnerComponent, ItskSpinnerOverlayComponent],
})
export class ItskSpinnerModule {}
