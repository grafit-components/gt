import { AnyObject } from '../../itsk-shared/any-object';

export class ItskTreeControl {
  data: AnyObject[] = [];
  expanded: AnyObject[] = [];
  getChildren: (item: AnyObject) => AnyObject[] | null | undefined;

  constructor(data: AnyObject[], open?: boolean, getChildren?: (item: AnyObject) => AnyObject[] | null | undefined) {
    this.data = data;
    if (getChildren) {
      this.getChildren = getChildren;
    } else {
      this.getChildren = this.defaultGetChildren;
    }
    if (open === true) {
      this.expanded = this.flatten(this.data);
    }
  }

  private flatten(arr: AnyObject[], level = 0): AnyObject[] {
    const result: AnyObject[] = [];
    arr.forEach((item) => {
      const children = this.getChildren(item);
      result.push(item);
      if (children !== null && children !== undefined && children.length > 0) {
        result.push(...this.flatten(children, level + 1));
      }
    });
    return result;
  }

  isExpanded(item: AnyObject): boolean {
    return this.expanded && this.expanded.indexOf(item) >= 0;
  }

  toggle(item: AnyObject) {
    if (this.expanded && this.expanded.indexOf(item) >= 0) {
      this.expanded.splice(this.expanded.indexOf(item), 1);
    } else {
      this.expanded.push(item);
    }
  }

  defaultGetChildren = (item: AnyObject) => {
    if (item && item['children']) {
      return item['children'];
    } else {
      return null;
    }
  };
}
