import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { IItskMenuItem } from '../model/i-itsk-menu-item';
import { ItskMenuGroup } from '../model/itsk-menu-group';

import { ItskMenuItemComponent } from '../itsk-menu-item/itsk-menu-item.component';
import { ItskClickOutsideDirective } from '../../../directive/itsk-click-outside/itsk-click-outside.directive';

@Component({
    selector: 'itsk-menu-items',
    templateUrl: './itsk-menu-items.component.html',
    styleUrls: ['./itsk-menu-items.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskMenuItemComponent, ItskClickOutsideDirective]
})
export class ItskMenuItemsComponent<T extends IItskMenuItem> implements OnInit, OnDestroy {
  allItems: T[] = [];
  items: T[] = [];
  groups: ItskMenuGroup<T>[] = [];

  @Input()
  set menu(value: T[]) {
    if (value && value.length > 0) {
      this.allItems = value;
      this.items = this.getMenu();
      this.groups = this.getGroups();
    }
  }

  @Input() template?: TemplateRef<any>;

  @Output() itemClick = new EventEmitter<T>();

  @Output() itemToggle = new EventEmitter<T>();

  openChild: IItskMenuItem | null = null;

  constructor(private cdr$: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnDestroy() {}

  private getMenu(): T[] {
    return this.allItems.filter((item) => {
      return (item.group === null || item.group === undefined || item.group.length === 0) && !item.hidden;
    });
  }

  private getGroups(): ItskMenuGroup<T>[] {
    const result: ItskMenuGroup<T>[] = [];
    const groupedItems = this.allItems.filter((item) => {
      return item.group !== null && item.group !== undefined && item.group.length > 0;
    });
    groupedItems.forEach((item: T) => {
      const found = result.find((x: ItskMenuGroup<T>) => {
        return x.name === item.group;
      });
      if (found === null || found === undefined) {
        result.push(
          new ItskMenuGroup<T>({
            name: item.group || '',
            items: groupedItems.filter((x) => x.group === item.group),
          }),
        );
      }
    });
    return result;
  }

  navigate(item: T) {
    this.itemClick.emit(item);
  }

  openItem(item: T) {
    if(this.openChild === item) {
      return;
    }
    if (this.openChild) {
      this.openChild.open = false;
    }

    if (this.openChild === item || !item.children?.filter((i) => !i.hidden)?.length) {
      this.openChild = null;
    } else {
      this.openChild = item;
      this.openChild.open = true;
    }

    this.cdr$.markForCheck();
    this.cdr$.detectChanges();
    this.itemToggle.emit(item);
  }

  clearChild() {
    if (this.openChild) {
      this.openChild.open = false;
      this.openChild = null;
    }
  }
}
