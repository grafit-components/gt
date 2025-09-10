import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  Type,
  ViewChild,
} from '@angular/core';
import { BooleanFunc, BooleanPromiseFunc } from '../../../../util/object-util';
import { Paging } from '../../../itsk-pager/model/paging';
import { GridCustomPanelDirective } from '../../directive/grid-custom-panel.directive';
import { GridPanelButtonDirective } from '../../directive/grid-panel-button.directive';
import { GridPanelContentDirective } from '../../directive/grid-panel-content.directive';
import { AdditionalComponentBase } from '../../model/additional-component-base';
import { AggregateComponentBase } from '../../model/aggregate-component-base';
import { ICellCoordinates, ICellEvent } from '../../model/cell-coordinates';
import { DetailComponentBase } from '../../model/detail-component-base';
import { GroupingType } from '../../model/enum/grouping-type.enum';
import { ItskGridEditEvent } from '../../model/enum/itsk-grid-edit-event.enum';
import { ItskGridEditMode } from '../../model/enum/itsk-grid-edit-mode.enum';
import { ItskGridEditType } from '../../model/enum/itsk-grid-edit-type.enum';
import { ItskGridSelectRowsByType } from '../../model/enum/itsk-grid-select-rows-by-type';
import { ItskGridSelectType } from '../../model/enum/itsk-grid-select-type';
import { FilterState } from '../../model/filter-state';
import { GridColumn } from '../../model/grid-column';
import { GridRow, IId } from '../../model/grid-row';
import { IGridWrapper } from '../../model/grid/i-grid-wrapper';
import { GroupRowComponentBase } from '../../model/group-row-component-base';
import { ItskGridService } from '../../service/itsk-grid.service';
import { ItskGridComponent } from '../itsk-grid/itsk-grid.component';
import { GroupRowDefaultComponent } from '../row/group-row-default/group-row-default.component';
import { NgTemplateOutlet } from '@angular/common';
import { ItskGridPanelComponent } from '../itsk-grid-panel/itsk-grid-panel.component';
import { ItskFilterPanelComponent } from '../../../itsk-filter/itsk-filter-panel/itsk-filter-panel.component';
import { GridColumnsSettingsComponent } from '../grid-columns-settings/grid-columns-settings.component';
import { ItskGridDetailComponent } from '../itsk-grid-detail/itsk-grid-detail.component';
import { ItskPagerComponent } from '../../../itsk-pager/itsk-pager/itsk-pager.component';

@Component({
    selector: 'itsk-grid-wrapper',
    templateUrl: './itsk-grid-wrapper.component.html',
    styleUrls: ['./itsk-grid-wrapper.component.scss'],
    providers: [ItskGridService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskGridPanelComponent, ItskFilterPanelComponent, GridColumnsSettingsComponent, NgTemplateOutlet, ItskGridComponent, ItskGridDetailComponent, ItskPagerComponent]
})
export class ItskGridWrapperComponent<T extends IId> implements IGridWrapper<T> {
  @HostBinding('class.grid-wrapper') gridClass = true;
  /** Данные для отображения в таблице */
  @Input() data?: GridRow<T>[];
  @Input() aggregate?: GridRow<T>;

  // hoveredColumn: string;

  @ContentChildren(GridPanelButtonDirective, { descendants: false }) panelButtons?: QueryList<GridPanelButtonDirective>;
  @ContentChildren(GridCustomPanelDirective, { descendants: false }) panelCustom?: QueryList<GridCustomPanelDirective>;
  @ContentChild(GridPanelContentDirective, { static: false }) panelContent?: GridPanelContentDirective;

  @ViewChild(ItskGridComponent) grid?: ItskGridComponent<T>;

  @Input() columns?: GridColumn[];
  @Input() state?: FilterState;
  @Output() stateChange: EventEmitter<FilterState> = new EventEmitter();
  @Input() paging?: Paging;
  @Output() pagingChange: EventEmitter<Paging> = new EventEmitter();
  @Input() stateful = true;
  @Input() cookieName?: string;
  @Input() virtual: boolean = false;
  @Input() forceColumnSync: boolean = false;
  @Input() showPager = true;
  @Input() showActionPanel = true;
  @Input() showFilterButton = true;
  @Input() showFilter: boolean = false;
  @Output() showFilterChange: EventEmitter<boolean> = new EventEmitter();
  @Input() showColumnsButton = true;
  @Input() showColumns: boolean = false;
  @Output() showColumnsChange: EventEmitter<boolean> = new EventEmitter();
  @Input() showDetailsButton = true;
  @Input() showDetails: boolean = false;
  @Output() showDetailsChange: EventEmitter<boolean> = new EventEmitter();
  @Input() showCustom: boolean = false;
  @Output() showCustomChange: EventEmitter<boolean> = new EventEmitter();
  @Input() detailComponent?: Type<DetailComponentBase<any>>;
  @Input() additionalComponent?: Type<AdditionalComponentBase<any>>;
  @Input() aggregateComponent?: Type<AggregateComponentBase<any>>;
  @Input() activeRow?: GridRow<T>;
  @Output() activeRowChange: EventEmitter<GridRow<T>> = new EventEmitter();
  /** Выбранные стргоки */
  @Input() selectedRows?: GridRow<T>[];
  @Output() selectedRowsChange: EventEmitter<GridRow<T>[]> = new EventEmitter();
  @Input() selectRowsBy: ItskGridSelectRowsByType = 'mouse';
  @Input() selectType: ItskGridSelectType = 'single';

  @Output() rowLeft = new EventEmitter<GridRow<T>>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() rowDoubleClick = new EventEmitter<ICellCoordinates<T>>();
  @Output() bodyLeft = new EventEmitter<GridRow<T>>();
  @Output() rowEditStart = new EventEmitter<GridRow<T>>();
  @Output() rowEditEnd = new EventEmitter<GridRow<T>>();
  @Output() cellClick = new EventEmitter<ICellEvent<T>>();
  @Output() cellDoubleClick = new EventEmitter<ICellEvent<T>>();
  @Output() cellFocus = new EventEmitter<ICellEvent<T>>();
  @Output() cellEditStart = new EventEmitter<ICellCoordinates<T>>();
  @Output() cellEditEnd = new EventEmitter<ICellCoordinates<T>>();
  @Output() valueChange = new EventEmitter<ICellCoordinates<T> | null>();
  @Output() cellKeyUp = new EventEmitter<ICellEvent<T>>();
  @Input() rowSelectable: boolean | ((row: GridRow<T>) => boolean) | ((row: GridRow<T>) => Promise<boolean>) = true;
  @Input() rowEditable: boolean | ((row: GridRow<T>) => boolean) | ((row: GridRow<T>) => Promise<boolean>) = true;
  @Input() cellEditable: boolean | BooleanFunc<ICellCoordinates<T>> | BooleanPromiseFunc<ICellCoordinates<T>> = true;
  @Input() editType: ItskGridEditType = ItskGridEditType.Cell;
  @Input() editOn: ItskGridEditEvent = ItskGridEditEvent.Click;
  @Input() editMode: ItskGridEditMode = ItskGridEditMode.Single;
  @Input() grouping: boolean = false;
  @Input() groupingType: GroupingType = GroupingType.Row;
  @Input() groupRowComponent: Type<GroupRowComponentBase<T>> = GroupRowDefaultComponent;
  @Input() openLevels?: number;
  @Input() tree: boolean = false;

  constructor() {}

  setShowFilter(val: boolean) {
    this.showFilter = val;
    this.showFilterChange.emit(this.showFilter);
  }

  setShowDetails(val: boolean) {
    this.showDetails = val;
    this.showDetailsChange.emit(this.showDetails);
  }

  setShowColumns(val: boolean) {
    this.showColumns = val;
    this.showColumnsChange.emit(this.showColumns);
  }

  setShowCustom(val: boolean) {
    this.showCustom = val;
    this.showCustomChange.emit(this.showCustom);
  }

  updatePaging(paging: Paging) {
    this.paging = paging;
    this.pagingChange.emit(this.paging);
  }

  setState(state: FilterState) {
    this.state = new FilterState(state);
    if (this.cookieName) this.state.save(this.cookieName);
    this.stateChange.emit(this.state);
  }
}
