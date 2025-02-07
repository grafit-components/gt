import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ItskGridSelectRowsByType } from '../../model/enum/itsk-grid-select-rows-by-type';
import { ItskGridSelectType } from '../../model/enum/itsk-grid-select-type';
import { FilterState } from '../../model/filter-state';
import { GridColumn } from '../../model/grid-column';

import { ItskGridHeadCellComponent } from '../itsk-grid-head-cell/itsk-grid-head-cell.component';

@Component({
    selector: 'itsk-grid-head-group',
    templateUrl: './itsk-grid-head-group.component.html',
    styleUrls: ['./itsk-grid-head-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskGridHeadCellComponent]
})
export class ItskGridHeadGroupComponent implements OnInit {
  private column$?: GridColumn;

  @Input() rootIndex?: number;
  @Input() selfIndex?: number;

  @Input()
  set column(column: GridColumn | undefined) {
    this.column$ = column;
  }

  get column() {
    return this.column$;
  }

  @Input() state?: FilterState;

  @Input() allColumns: GridColumn[] = [];
  @Input() selectRowsBy: ItskGridSelectRowsByType = 'mouse';
  @Input() selectType: ItskGridSelectType = 'single';

  // @Output() hoveredColumn: EventEmitter<string | null> = new EventEmitter();

  // @HostListener('mouseleave') mouseleave() {
  //   this.hoveredColumn.emit(null);
  // }

  constructor() {}

  ngOnInit() {}

  // columnHover(name: string | null) {
  //   this.hoveredColumn.emit(name);
  // }
}
