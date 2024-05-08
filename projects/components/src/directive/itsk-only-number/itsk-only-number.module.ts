import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskOnlyNumberDirective } from './itsk-only-number.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ItskOnlyNumberDirective],
  exports: [ItskOnlyNumberDirective],
})
export class ItskOnlyNumberModule {}
