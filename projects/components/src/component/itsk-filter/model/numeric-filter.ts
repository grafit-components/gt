import {NumericFilterValue} from './numeric-filter-value';
import {FilterBase} from './filter-base';

export class NumericFilter extends FilterBase {
  value: NumericFilterValue;
  strict: boolean;

  constructor(options?: {
    value?: NumericFilterValue;
    strict?: boolean;
    fieldName: string;
    name: string;
  }) {
    super(options);
    if (options) {
      this.value = options.value || this.value;
      this.strict = options.strict || false;
    }
  }
}
