import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItskTreeControl } from '../../../itsk-tree/model/itsk-tree-control';
import { GridColumn } from '../../model/grid-column';
import { ItskTreeComponent } from '../../../itsk-tree/itsk-tree/itsk-tree.component';
import { ItskTreeTemplateDirective } from '../../../itsk-tree/itsk-tree-template.directive';
import { ItskTreeItemComponent } from '../../../itsk-tree/itsk-tree-item/itsk-tree-item.component';

import { ItskIconComponent } from '../../../itsk-icon/itsk-icon/itsk-icon.component';
import { ItskCheckboxComponent } from '../../../itsk-checkbox/itsk-checkbox/itsk-checkbox.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'itsk-grid-columns-settings',
    templateUrl: './grid-columns-settings.component.html',
    styleUrls: ['./grid-columns-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskTreeComponent, ItskTreeTemplateDirective, ItskTreeItemComponent, ItskIconComponent, ItskCheckboxComponent, FormsModule]
})
export class GridColumnsSettingsComponent implements OnInit {
  treeControl: ItskTreeControl;

  columns$: GridColumn[] = [];

  @Input()
  set columns(columns: GridColumn[]) {
    this.columns$ = columns;
    this.treeControl = new ItskTreeControl(this.columns$, true, this.getChildren);
  }

  @Output() columnsChange: EventEmitter<GridColumn[]> = new EventEmitter<GridColumn[]>();

  constructor() {
    this.treeControl = new ItskTreeControl(this.columns$, true, this.getChildren);
  }

  hide(column: GridColumn, value: boolean) {
    this.hideChildren(column, value);
    this.checkParents(column, value);
    this.columnsChange.emit(this.columns$.map((_: GridColumn) => new GridColumn(_)));
  }

  hideChildren = (column: GridColumn, value: boolean) => {
    column.hidden = value;
    if (column.columns) {
      column.columns.forEach((x) => {
        this.hideChildren(x as any, value);
      });
    }
  };

  checkParents = (column: GridColumn, value: boolean) => {
    if (value) {
      this.hideParents(column);
    } else {
      this.showParents(column);
    }
  };

  showParents(column: GridColumn) {
    const parent = this.findParent(column, this.columns$);
    if (parent && parent.hidden === true) {
      parent.hidden = false;
      this.showParents(parent);
    }
  }

  hideParents(column: GridColumn) {
    const parent = this.findParent(column, this.columns$);
    if (parent && !parent.hidden && parent.columns && parent.columns.every((_: any) => _.hidden)) {
      parent.hidden = true;
      this.hideParents(parent);
    }
  }

  ngOnInit() {}

  private findParent(column: GridColumn, columns: GridColumn[]): GridColumn | null {
    const found = columns.find((x) => {
      return x.columns && x.columns.some((_) => _.name === column.name);
    });
    if (found !== null && found !== undefined) {
      return found;
    }
    for (let i = 0, l = columns.length; i < l; i++) {
      const col = columns[i];
      if (col.columns && col.columns.length) {
        const res = this.findParent(column, col.columns as any);
        if (res !== null && res !== undefined) {
          return res;
        }
      }
    }
    return null;
  }

  getChildren = (item: any) => {
    return item.columns;
  };
}
