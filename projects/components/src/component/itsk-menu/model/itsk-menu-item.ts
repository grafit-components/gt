import {IItskMenuItem} from './i-itsk-menu-item';

export interface ItskMenuItemOptions {
  id?: number | undefined | null;
  parentId?: number | undefined | null;
  name: string;
  url?: string;
  hidden?: boolean;
  code?: string;
  group?: string;
  iconClassName?: string;
  sortOrder?: number;
  children?: any[];
  open?: boolean;
}

export class ItskMenuItem implements IItskMenuItem {
  id: number | undefined | null;
  parentId: number | undefined | null;
  name: string = '';
  url: string | undefined;
  hidden: boolean | undefined;
  code: string | undefined;
  group: string | undefined;
  iconClassName: string | undefined;
  sortOrder: number | undefined;
  children: ItskMenuItem[] = [];
  open: boolean | undefined;

  constructor(options?: ItskMenuItemOptions) {
    if (options) {
      this.id = options.id;
      this.parentId = options.parentId;
      this.name = options.name;
      this.url = options.url;
      this.hidden = options.hidden;
      this.code = options.code;
      this.group = options.group;
      this.iconClassName = options.iconClassName;
      this.sortOrder = options.sortOrder;
      this.open = options.open;
      if (options.children && options.children.length > 0) {
        this.children = options.children.map((x) => {
          return new ItskMenuItem(x);
        });
      }
    }
  }
}
