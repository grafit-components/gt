import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ItskDelimiterComponent,
  ItskIconComponent,
  ItskListComponent,
  ItskListGroupComponent,
  ItskListItemComponent,
} from '@grafit/components';

@Component({
  selector: 'app-list-basic',
  imports: [ItskListComponent, ItskListItemComponent, ItskListGroupComponent, ItskDelimiterComponent, ItskIconComponent],
  template: `
    <itsk-list style="width: 280px">
      <itsk-list-item (click)="clicked = 'Профиль'"><itsk-icon name="icon-user-filled" class="margin-r-2" /> Профиль</itsk-list-item>
      <itsk-list-item (click)="clicked = 'Настройки'">
        <itsk-icon name="icon-settings-star-gear-filled" class="margin-r-2" /> Настройки
      </itsk-list-item>
      <itsk-delimiter />
      <itsk-list-group>Документы</itsk-list-group>
      <itsk-list-item (click)="clicked = 'Отчёт'">Отчёт</itsk-list-item>
      <itsk-list-item (click)="clicked = 'Договор'">Договор</itsk-list-item>
    </itsk-list>
    <br />
    Clicked: {{ clicked }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBasicComponent {
  protected clicked = '—';
}
