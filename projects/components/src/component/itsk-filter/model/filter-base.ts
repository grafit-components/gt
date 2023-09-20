export class FilterBase {
  fieldName: string;
  name: string;

  constructor(options?: {
    fieldName: string,
    name: string
  }) {
    if (options) {
      this.fieldName = options.fieldName;
      this.name = options.name;
    }
  }
}
