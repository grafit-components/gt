import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItskTreeComponent, ItskTreeControl, ItskTreeItemComponent, ItskTreeTemplateDirective } from '@grafit/components';

type Folder = {
  title: string;
  folders?: Folder[];
};

@Component({
  selector: 'app-tree-control',
  imports: [ItskTreeComponent, ItskTreeItemComponent, ItskTreeTemplateDirective],
  template: `
    <itsk-tree [data]="data" [control]="control">
      <ng-template itskTreeTemplate let-item let-index="index">
        <itsk-tree-item class="cursor_pointer" (click)="control.toggle(item)">{{ index + 1 }}. {{ item.title }}</itsk-tree-item>
      </ng-template>
    </itsk-tree>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeControlComponent {
  protected data: Folder[] = [
    { title: 'Проекты', folders: [{ title: 'Grafit', folders: [{ title: 'docs' }, { title: 'src' }] }, { title: 'Архив' }] },
    { title: 'Загрузки' },
  ];

  /** Свой контрол: всё развёрнуто с самого начала, дочерние узлы лежат в поле `folders` */
  protected control = new ItskTreeControl(this.data, true, (item) => item['folders']);
}
