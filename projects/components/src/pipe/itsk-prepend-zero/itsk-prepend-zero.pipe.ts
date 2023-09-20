import {Pipe, PipeTransform} from '@angular/core';
import {prependZero} from '../number_func';

@Pipe({
  name: 'itskPrependZero'
})
export class ItskPrependZeroPipe implements PipeTransform {
  transform(value: number, length: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    value /= 1;
    return prependZero(value, length);
  }
}
