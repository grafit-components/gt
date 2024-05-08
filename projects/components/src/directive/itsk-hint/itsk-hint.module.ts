import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskHintContainerComponent } from './itsk-hint-container/itsk-hint-container.component';
import { ItskHintDirective } from './itsk-hint.directive';

@NgModule({
  declarations: [ItskHintDirective, ItskHintContainerComponent],
  exports: [ItskHintDirective],
  imports: [CommonModule],
})
export class ItskHintModule {}
