import { DateFilterValue } from './date-filter-value';
import { FilterBase } from './filter-base';

export class DateFilter extends FilterBase {
  value: DateFilterValue = new DateFilterValue();

  constructor(options?: { value?: DateFilterValue; fieldName: string; name: string }) {
    super(options);
    if (options) {
      this.value = new DateFilterValue(options.value);
    }
  }
}
