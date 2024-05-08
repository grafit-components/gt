import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskDisableControlDirective } from './itsk-disable-control.directive';

@NgModule({
  declarations: [ItskDisableControlDirective],
  exports: [ItskDisableControlDirective],
  imports: [CommonModule],
})
export class ItskDisableControlModule {}
