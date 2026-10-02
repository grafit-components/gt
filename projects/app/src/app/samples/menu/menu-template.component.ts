import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IItskMenuItem, ItskMenuComponent, ItskMenuItemDirective } from '@grafit/components';

interface CounterMenuItem extends IItskMenuItem {
  count: number;
}

@Component({
  selector: 'app-menu-template',
  imports: [ItskMenuComponent, ItskMenuItemDirective],
  template: `
    <div class="border-1px border-color_default" style="width: 280px">
      <itsk-menu [menu]="menu">
        <ng-template itskMenuItem let-item>
          <span class="menu__item__name">{{ item.name }} ({{ item.count }})</span>
        </ng-template>
      </itsk-menu>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuTemplateComponent {
  protected menu: CounterMenuItem[] = [
    { name: 'Входящие', count: 12 },
    { name: 'Черновики', count: 3 },
    { name: 'Отправленные', count: 48 },
  ];
}
