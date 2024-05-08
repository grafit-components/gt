import { ItskCheckboxModule } from '../itsk-checkbox/itsk-checkbox.module';
import { ItskIconModule } from '../itsk-icon/itsk-icon.module';
import { ItskTreeModule } from './itsk-tree.module';
import { ItskTreeComponent } from './itsk-tree/itsk-tree.component';

export default {
  component: ItskTreeComponent,
  title: 'Tree',
  args: {
    data: [
      {
        name: 'name 1',
        children: [
          {
            name: 'child 1',
          },
        ],
      },
      {
        name: 'name 2',
        children: [
          {
            name: 'child 2',
            children: [
              {
                name: 'name 3',
                children: [
                  {
                    name: 'sub child 3',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'child 1',
      },
      {
        name: 'name 1',
        children: [
          {
            name: 'child 1',
          },
        ],
      },
      {
        name: 'name 2',
        children: [
          {
            name: 'child 2',
            children: [
              {
                name: 'name 3',
                children: [
                  {
                    name: 'sub child 3',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'child 1',
      },
    ],
  },
};

export const Default = (args: ItskTreeComponent) => ({
  moduleMetadata: {
    imports: [ItskTreeModule, ItskCheckboxModule, ItskIconModule],
  },
  props: args,
  template: `<itsk-tree [data]="data" [open]="open" style="margin-left: 24px;">
        <itsk-tree-item *itskTreeTemplate="let item; let control=control; let index = index">
          <div class="tree__toggle" (click)="control.toggle(item)" *ngIf="item.children && item.children.length">
          <itsk-icon [name]="!control.isExpanded(item) ? 'icon-group_square_max-plus-rectangle-filled' : 'icon-group_square_min-minus-rectangle-filled'"></itsk-icon>
          </div>
          <itsk-checkbox *ngIf="index%2"></itsk-checkbox>
          {{item.name}}
        </itsk-tree-item>
      </itsk-tree>`,
});
