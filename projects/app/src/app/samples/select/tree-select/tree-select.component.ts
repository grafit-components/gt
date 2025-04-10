import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskTreeSelectComponent, TreeSelectItem } from '@grafit/components';

@Component({
  selector: 'app-tree-select',
  imports: [ItskTreeSelectComponent, FormsModule, JsonPipe],
  templateUrl: './tree-select.component.html',
  styleUrl: './tree-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectComponent implements OnInit {
  protected items: TreeSelectItem[] = [];

  protected selectedValue: TreeSelectItem | undefined | null;

  protected initItems() {
    this.items = [
      {
        name: 'Item 1',
        id: 1,
        children: [
          {
            name: 'Item 11',
            id: 11,
            children: [
              {
                name: 'Item 111',
                id: 111,
              },
              {
                name: 'Item 112',
                id: 112,
              },
              {
                name: 'Item 113',
                id: 113,
              },
            ],
          },
          {
            name: 'Item 12',
            id: 12,
            children: [
              {
                name: 'Item 121',
                id: 121,
              },
              {
                name: 'Item 122',
                id: 122,
              },
              {
                name: 'Item 123',
                id: 123,
              },
            ],
          },
        ],
      },
      {
        name: 'Item 2',
        id: 2,
        children: [
          {
            name: 'Item 21',
            id: 21,
            children: [
              {
                name: 'Item 211',
                id: 211,
              },
            ],
          },
          {
            name: 'Item 22',
            id: 22,
            children: [
              {
                name: 'Item 221',
                id: 221,
              },
              {
                name: 'Item 222',
                id: 222,
              },
              {
                name: 'Item 223',
                id: 223,
              },
            ],
          },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.initItems();
  }

  protected prepareValueRef(item?: TreeSelectItem) {
    return item;
  }
}
