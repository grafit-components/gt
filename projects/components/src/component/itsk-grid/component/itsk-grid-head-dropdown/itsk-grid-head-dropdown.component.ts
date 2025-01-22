import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ClickOutsideBase } from '../../../../directive/itsk-click-outside/click-outside-base';
import { FilterState } from '../../model/filter-state';
import { GridColumn } from '../../model/grid-column';
import { IId } from '../../model/grid-row';
import { ItskGridDictionary } from '../../model/itsk-grid-dictionary';
import { ItskGridConfigService } from '../../service/itsk-grid-config.service';
import { ItskGridService } from '../../service/itsk-grid.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { ItskTabsComponent } from '../../../itsk-tabs/itsk-tabs/itsk-tabs.component';
import { ItskTabComponent } from '../../../itsk-tabs/itsk-tab/itsk-tab.component';
import { ItskTabTitleDirective } from '../../../itsk-tabs/itsk-tab-title/itsk-tab-title.directive';
import { ItskTabContentDirective } from '../../../itsk-tabs/itsk-tab-content/itsk-tab-content.directive';
import { FilterWrapperComponent } from '../../../itsk-filter/filter-wrapper/filter-wrapper.component';
import { GridColumnsSettingsComponent } from '../grid-columns-settings/grid-columns-settings.component';
import { ItskIconComponent } from '../../../itsk-icon/itsk-icon/itsk-icon.component';

@Component({
    selector: 'itsk-grid-head-dropdown',
    templateUrl: './itsk-grid-head-dropdown.component.html',
    styleUrls: ['./itsk-grid-head-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, ItskTabsComponent, ItskTabComponent, ItskTabTitleDirective, ItskTabContentDirective, FilterWrapperComponent, GridColumnsSettingsComponent, ItskIconComponent, AsyncPipe]
})
export class ItskGridHeadDropdownComponent<T extends IId> extends ClickOutsideBase implements OnInit, OnDestroy {
  private subs = true;
  private position$?: DOMRect;
  private visible$: boolean = false;

  set visible(val: boolean) {
    this.visible$ = val;
  }

  get visible() {
    return this.visible$;
  }

  top?: string | null;
  bottom?: string | null;
  left?: string | null;
  right?: string | null;

  column$?: GridColumn | null;

  set column(column: GridColumn | null | undefined) {
    this.column$ = column;
    this.visible = !!column;
    if (this.visible) {
      this.addListener(false);
    } else {
      this.removeListener(false);
    }
    this.cdr$.detectChanges();
  }

  get column(): GridColumn | null | undefined {
    return this.column$;
  }

  state$?: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
  }

  allColumns: GridColumn[] = [];

  dict: Observable<ItskGridDictionary>;

  constructor(
    private svc$: ItskGridService<T>,
    private cdr$: ChangeDetectorRef,
    private config$: ItskGridConfigService,
    private element$: ElementRef,
  ) {
    super(element$.nativeElement);
    this.dict = this.config$.dict;
  }

  ngOnInit() {
    this.svc$.columnMenu.pipe(takeWhile((_) => this.subs)).subscribe((data) => {
      this.position$ = data.position;
      this.setPosition();
      this.column = data.column;
    });
    this.svc$.columns.pipe(takeWhile((_) => this.subs)).subscribe((columns) => {
      this.allColumns = columns;
    });
  }

  ngOnDestroy() {
    this.subs = false;
    this.removeListener(false);
  }

  clearFilter(column: GridColumn, event: MouseEvent) {
    this.svc$.clearFilter(column);
  }

  pinColumn(column: GridColumn, event: MouseEvent) {
    this.svc$.pinColumn(column);
  }

  applyFilter(event: MouseEvent) {
    if (this.state$) this.svc$.setState(this.state$);
  }

  changeColumns(event: GridColumn[]) {
    this.svc$.updateColumns();
  }

  clickedOutside = (click: MouseEvent) => {
    this.column = null;
  };

  private setPosition() {
    if (!this.position$) return;
    const leftPosition = this.position$.left + window.pageXOffset;
    const topPosition = this.position$.bottom + window.pageYOffset;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    if (topPosition < 0.6 * pageHeight) {
      this.top = `${topPosition}`;
      this.bottom = 'auto';
    } else {
      this.top = 'auto';
      this.bottom = `${pageHeight - topPosition + this.element$.nativeElement.offsetHeight}`;
    }
    if (leftPosition < 0.6 * pageWidth) {
      this.left = `${leftPosition}`;
      this.right = 'auto';
    } else {
      this.left = 'auto';
      this.right = `${pageWidth - this.position$.right}`;
    }
  }
}
