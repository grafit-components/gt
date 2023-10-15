import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItskCurrencyPipe} from './itsk-currency.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItskCurrencyPipe],
  exports: [ItskCurrencyPipe]
})
export class ItskCurrencyPipeModule {
}
