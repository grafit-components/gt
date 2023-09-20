import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FilterState} from '../../model/filter-state';
import {GridColumn} from '../../model/grid-column';
import {ItskGridSelectRowsByType} from '../../model/enum/itsk-grid-select-rows-by-type';
import {ItskGridSelectType} from '../../model/enum/itsk-grid-select-type';

@Component({
  selector: 'itsk-grid-head-group',
  templateUrl: './itsk-grid-head-group.component.html',
  styleUrls: ['./itsk-grid-head-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridHeadGroupComponent implements OnInit {
  private column$: GridColumn;

  @Input() rootIndex: number;
  @Input() selfIndex: number;

  @Input()
  set column(column: GridColumn) {
    this.column$ = column;
  }

  get column() {
    return this.column$;
  }

  @Input() state: FilterState;

  @Input() allColumns: GridColumn[] = [];
  @Input() selectRowsBy: ItskGridSelectRowsByType = 'mouse';
  @Input() selectType: ItskGridSelectType = 'single';

  // @Output() hoveredColumn: EventEmitter<string | null> = new EventEmitter();

  // @HostListener('mouseleave') mouseleave() {
  //   this.hoveredColumn.emit(null);
  // }

  constructor() {
  }

  ngOnInit() {
  }

  // columnHover(name: string | null) {
  //   this.hoveredColumn.emit(name);
  // }
}
