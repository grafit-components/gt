export class IdNameModel<T> {
  public id: T | null = null;
  public name?: string;

  constructor(options?: {
    id: T | null;
    name: string;
  }) {
    if (options) {
      this.id = options.id;
      this.name = options.name;
    }
  }
}
