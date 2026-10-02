import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IItskMenuItem, ItskMenuComponent } from '@grafit/components';

@Component({
  selector: 'app-menu-basic',
  imports: [ItskMenuComponent],
  template: `
    <div class="border-1px border-color_default" style="width: 280px">
      <itsk-menu [menu]="menu" (itemClick)="clicked = $event.name" />
    </div>
    <br />
    Clicked: {{ clicked }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBasicComponent {
  /** Пункты без `url` никуда не ведут — в примере достаточно события `itemClick` */
  protected menu: IItskMenuItem[] = [
    { name: 'Обзор', iconClassName: 'icon-home-house-filled' },
    { name: 'Профиль', iconClassName: 'icon-user-filled' },
    { name: 'Скрытый пункт', hidden: true },
    { name: 'Пользователи', group: 'Администрирование' },
    { name: 'Настройки', group: 'Администрирование', iconClassName: 'icon-settings-star-gear-filled' },
  ];

  protected clicked = '—';
}
