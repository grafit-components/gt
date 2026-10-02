import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskTreeSelectComponent, TreeSelectItem } from '@grafit/components';

@Component({
  selector: 'app-tree-select-multiple',
  imports: [ItskTreeSelectComponent, FormsModule, JsonPipe],
  template: `
    <itsk-tree-select
      [items]="items"
      [(ngModel)]="selected"
      [multiple]="true"
      valueRef="id"
      textRef="name"
      searchRef="name"
      selectedRef="block"
      placeholder="Выберите подразделения"
      [showClearButton]="true"
    />
    <br />
    Selected: {{ selected | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectMultipleComponent {
  protected items: TreeSelectItem[] = [
    {
      id: 1,
      name: 'Разработка',
      children: [
        { id: 11, name: 'Фронтенд' },
        { id: 12, name: 'Бэкенд' },
      ],
    },
    {
      id: 2,
      name: 'Аналитика',
      children: [
        { id: 21, name: 'Системная' },
        { id: 22, name: 'Бизнес' },
      ],
    },
  ];

  protected selected: number[] = [11];
}
