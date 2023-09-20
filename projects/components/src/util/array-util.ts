export class ArrayUtil {
  public static getSequence(start: number, end: number): number[] {
    if (end <= start) {
      throw new Error(('Can\'t calculate sequence for given params'));
    }
    const sequence = [];
    for (let i = start; i <= end; i++) {
      sequence.push(i);
    }
    return sequence;
  }

  public static flatten(data: any[], children?: string | ((item: any) => any[]), onlyLeafs?: boolean): any[] {
    const result: any[] = [];
    data?.forEach((child) => {
      let childItems: any[] = [];
      if (children) {
        if (typeof children === 'string') {
          childItems = child[children];
        }
        if (typeof children === 'function') {
          childItems = children(child);
        }
      } else {
        childItems = child.children;
      }
      if (childItems !== null && childItems !== undefined && childItems.length > 0) {
        if (!onlyLeafs) {
          result.push(child);
        }
        result.push(...ArrayUtil.flatten(childItems, children));
      } else {
        result.push(child);
      }
    });
    return result;
  }
}
