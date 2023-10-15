import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ItskMenuGroup} from '../model/itsk-menu-group';
import {IItskMenuItem} from '../model/i-itsk-menu-item';
import {ItskMenuItemDirective} from '../itsk-menu-item.directive';

@Component({
  selector: 'itsk-menu',
  templateUrl: './itsk-menu.component.html',
  styleUrls: ['./itsk-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskMenuComponent<T extends IItskMenuItem> implements OnInit, AfterViewInit {
  @HostBinding('class.menu') classMenu = true;
  @ContentChild(ItskMenuItemDirective, {static: false}) template?: ItskMenuItemDirective;

  groups: ItskMenuGroup<T>[] = [];

  @Input() menu: T[] = [];

  @Output() itemClick = new EventEmitter<T>();

  @Output() itemToggle = new EventEmitter<T>();

  openChild: IItskMenuItem | null = null;

  constructor(private cdr$: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  navigate(item: T) {
    this.itemClick.emit(item);
  }

  openItem(item: T) {
    this.openChild = null;
    this.itemToggle.emit(item);
  }
}
