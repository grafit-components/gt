import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskDropdownComponent, ItskDropdownContentDirective, ItskDropdownHeadDirective } from '@grafit/components';

@Component({
  selector: 'app-dropdown-basic',
  imports: [ItskDropdownComponent, ItskDropdownHeadDirective, ItskDropdownContentDirective],
  template: `
    <itsk-dropdown [(open)]="open" style="display: inline-block">
      <ng-template itskDropdownHead>
        <button class="button_default">Действия</button>
      </ng-template>
      <ng-template itskDropdownContent>
        <div class="list">
          @for (action of actions; track action) {
            <div class="list__item" (click)="select(action)">{{ action }}</div>
          }
        </div>
      </ng-template>
    </itsk-dropdown>
    <br />
    Open: {{ open }}, selected: {{ selected }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownBasicComponent {
  protected actions = ['Открыть', 'Переименовать', 'Удалить'];

  protected open = false;

  protected selected = '—';

  protected select(action: string) {
    this.selected = action;
    this.open = false;
  }
}
