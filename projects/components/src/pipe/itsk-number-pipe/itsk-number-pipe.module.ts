import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskNumberPipe} from './itsk-number.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItskNumberPipe],
  exports: [ItskNumberPipe]
})
export class ItskNumberPipeModule {
}
