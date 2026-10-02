import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskIconComponent, ItskTreeComponent, ItskTreeItemComponent, ItskTreeTemplateDirective } from '@grafit/components';

interface Department {
  name: string;
  children?: Department[];
}

@Component({
  selector: 'app-tree-basic',
  imports: [ItskTreeComponent, ItskTreeItemComponent, ItskTreeTemplateDirective, ItskIconComponent],
  template: `
    <itsk-tree [data]="data">
      <ng-template itskTreeTemplate let-item let-control="control">
        <itsk-tree-item class="cursor_pointer" (click)="control.toggle(item)">
          @if (item.children) {
            <itsk-icon
              class="margin-r-2"
              [name]="control.isExpanded(item) ? 'icon-chevron_down-arrow-outline' : 'icon-chevron_right-arrow-outline'"
            />
          }
          {{ item.name }}
        </itsk-tree-item>
      </ng-template>
    </itsk-tree>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeBasicComponent {
  protected data: Department[] = [
    {
      name: 'Разработка',
      children: [{ name: 'Фронтенд', children: [{ name: 'Дизайн-система' }, { name: 'Порталы' }] }, { name: 'Бэкенд' }],
    },
    { name: 'Аналитика', children: [{ name: 'Системная' }, { name: 'Бизнес' }] },
    { name: 'Бухгалтерия' },
  ];
}
