import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { IItskMenuItem } from '../model/i-itsk-menu-item';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ItskIconComponent } from '../../itsk-icon/itsk-icon/itsk-icon.component';

@Component({
    selector: 'itsk-menu-item',
    templateUrl: './itsk-menu-item.component.html',
    styleUrls: ['./itsk-menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLinkActive, ItskIconComponent, RouterLink, NgTemplateOutlet]
})
export class ItskMenuItemComponent<T extends IItskMenuItem> implements OnInit, OnDestroy {
  private timer: any;
  private debounceTime = 200;
  item$?: T;

  @Input()
  set item(item: T) {
    this.item$ = item;
    this.children = this.item$?.children?.filter((_: IItskMenuItem) => {
      return !_.hidden;
    });
  }

  children?: IItskMenuItem[];

  @Input() template?: TemplateRef<any>;

  @Input() isOpen = false;

  @Output() itemClick = new EventEmitter<T>();

  @Output() itemToggle = new EventEmitter<T>();

  constructor() {}

  navigate(item: T) {
    if (item.navigate) {
      item.navigate(item);
    }
    this.itemClick.emit(item);
  }

  openItem(item: T) {
   this.clearTimeout()
    this.timer = setTimeout(() => this.itemToggle.emit(item), this.debounceTime);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.item$) this.item$.open = false;
    this.clearTimeout()
  }

  clearTimeout() {
    clearTimeout(this.timer)
  }
}
