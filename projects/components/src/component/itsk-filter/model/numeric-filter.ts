import { FilterBase } from './filter-base';
import { NumericFilterValue } from './numeric-filter-value';

export class NumericFilter extends FilterBase {
  value: NumericFilterValue = new NumericFilterValue();
  strict: boolean = false;

  constructor(options?: { value?: NumericFilterValue; strict?: boolean; fieldName: string; name: string }) {
    super(options);
    if (options) {
      this.value = options.value ?? new NumericFilterValue();
      this.strict = options.strict || false;
    }
  }
}
