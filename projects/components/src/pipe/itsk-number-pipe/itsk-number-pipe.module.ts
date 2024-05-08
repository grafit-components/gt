import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskNumberPipe } from './itsk-number.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ItskNumberPipe],
  exports: [ItskNumberPipe],
})
export class ItskNumberPipeModule {}
