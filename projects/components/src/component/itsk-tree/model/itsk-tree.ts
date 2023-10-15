import {IItskTreeItem} from './i-itsk-tree-item';

export class ItskTree<T extends IItskTreeItem> {
  data: T[] = [];
}
