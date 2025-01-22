import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItskCurrencyPipe } from './itsk-currency.pipe';

@NgModule({
    imports: [CommonModule, ItskCurrencyPipe],
    exports: [ItskCurrencyPipe],
})
export class ItskCurrencyPipeModule {}
