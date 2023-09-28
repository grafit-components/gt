import {FilterBase} from './filter-base';
import {DateFilterValue} from './date-filter-value';

export class DateFilter extends FilterBase {
  value: DateFilterValue = new DateFilterValue();

  constructor(options?: {
    value?: DateFilterValue;
    fieldName: string;
    name: string;
  }) {
    super(options);
    if (options) {
      this.value = new DateFilterValue(options.value);
    }
  }
}
