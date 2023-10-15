import {IItskMenuItem} from './i-itsk-menu-item';

export class ItskMenuGroup<T extends IItskMenuItem> {
  name: string = '';
  items: T[] = [];

  constructor(options?: {
    name: string;
    items?: T[];
  }) {
    if (options) {
      this.name = options.name;
      if (options.items && options.items.length > 0) {
        this.items = options.items;
      }
    }
  }
}
