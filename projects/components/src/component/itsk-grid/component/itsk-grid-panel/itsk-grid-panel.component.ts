import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, QueryList, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { GridPanelButtonDirective } from '../../directive/grid-panel-button.directive';
import { GridPanelContentDirective } from '../../directive/grid-panel-content.directive';
import { DetailComponentBase } from '../../model/detail-component-base';
import { IId } from '../../model/grid-row';
import { ItskGridDictionary } from '../../model/itsk-grid-dictionary';
import { ItskGridConfigService } from '../../service/itsk-grid-config.service';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { ItskIconComponent } from '../../../itsk-icon/itsk-icon/itsk-icon.component';

@Component({
    selector: 'itsk-grid-panel',
    templateUrl: './itsk-grid-panel.component.html',
    styleUrls: ['./itsk-grid-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskIconComponent, NgTemplateOutlet, AsyncPipe]
})
export class ItskGridPanelComponent<T extends IId> implements OnInit {
  _showDetails: boolean = false;
  _showFilter: boolean = false;
  _showColumns: boolean = false;
  _showCustom: boolean = false;

  @Output() showDetailsChange: EventEmitter<boolean> = new EventEmitter();
  @Output() showFilterChange: EventEmitter<boolean> = new EventEmitter();
  @Output() showColumnsChange: EventEmitter<boolean> = new EventEmitter();
  @Output() showCustomChange: EventEmitter<boolean> = new EventEmitter();

  @Input() showFilterButton: boolean = false;
  @Input() showColumnsButton: boolean = false;
  @Input() showDetailsButton: boolean = false;
  @Input() detailComponent?: Type<DetailComponentBase<T>>;

  @Input()
  set showDetails(val: boolean) {
    this._showDetails = val;
  }

  @Input()
  set showFilter(val: boolean) {
    this._showFilter = val;
  }

  @Input()
  set showColumns(val: boolean) {
    this._showColumns = val;
  }

  @Input()
  set showCustom(val: boolean) {
    this._showCustom = val;
  }

  @Input() panelButtons?: QueryList<GridPanelButtonDirective>;
  @Input() panelContent?: GridPanelContentDirective;

  dict: Observable<ItskGridDictionary>;

  constructor(private _config: ItskGridConfigService) {
    this.dict = _config.dict;
  }

  ngOnInit() {}

  changeFilters() {
    this._showFilter = !this._showFilter;
    this._showColumns = false;
    this._showCustom = false;
    this.emit();
  }

  changeColumns() {
    this._showColumns = !this._showColumns;
    this._showCustom = false;
    this._showFilter = false;
    this.emit();
  }

  changeCustom() {
    this._showCustom = !this._showCustom;
    this._showColumns = false;
    this._showFilter = false;
    this.emit();
  }

  changeDetails() {
    this._showDetails = !this._showDetails;
    this.showDetailsChange.emit(this._showDetails);
  }

  private emit() {
    this.showFilterChange.emit(this._showFilter);
    this.showColumnsChange.emit(this._showColumns);
    this.showCustomChange.emit(this._showCustom);
  }
}
