import {Pipe, PipeTransform} from '@angular/core';
import {formatNumber} from '../number_func';

@Pipe({
  name: 'itskCurrency'
})
export class ItskCurrencyPipe implements PipeTransform {
  transform(value: number,
            currencySign: string = '',
            decimalLength: number = 2,
            chunkDelimiter: string = ' ',
            decimalDelimiter: string = '.',
            chunkLength: number = 3): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (value !== value / 1) {
      return value.toString();
    }
    value /= 1;
    return currencySign +
      formatNumber(value,
        decimalLength,
        chunkDelimiter,
        decimalDelimiter,
        chunkLength);
  }
}
