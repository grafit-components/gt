import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {GridColumn} from '../../model/grid-column';
import {ItskGridService} from '../../service/itsk-grid.service';
import {ItskGridDictionary} from '../../model/itsk-grid-dictionary';
import {Observable} from 'rxjs';
import {FilterState} from '../../model/filter-state';
import {ItskGridConfigService} from '../../service/itsk-grid-config.service';
import {ClickOutsideBase} from '../../../../directive/itsk-click-outside/click-outside-base';
import {IId} from '../../model/grid-row';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'itsk-grid-head-dropdown',
  templateUrl: './itsk-grid-head-dropdown.component.html',
  styleUrls: ['./itsk-grid-head-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskGridHeadDropdownComponent<T extends IId> extends ClickOutsideBase implements OnInit, OnDestroy {
  private subs = true;
  private position$: DOMRect;
  private visible$: boolean;

  set visible(val: boolean) {
    this.visible$ = val;
  }

  get visible() {
    return this.visible$;
  }

  top: string | null;
  bottom: string | null;
  left: string | null;
  right: string | null;

  column$: GridColumn | null;

  set column(column: GridColumn | null) {
    this.column$ = column;
    this.visible = !!column;
    if (this.visible) {
      this.addListener(false);
    } else {
      this.removeListener(false);
    }
    this.cdr$.detectChanges();
  }

  get column(): GridColumn | null {
    return this.column$;
  }

  state$: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
  }

  allColumns: GridColumn[] = [];

  dict: Observable<ItskGridDictionary>;

  constructor(private svc$: ItskGridService<T>,
              private cdr$: ChangeDetectorRef,
              private config$: ItskGridConfigService,
              private element$: ElementRef) {
    super(element$.nativeElement);
    this.dict = this.config$.dict;
  }

  ngOnInit() {
    this.svc$.columnMenu.pipe(takeWhile(_ => this.subs)).subscribe((data) => {
      this.position$ = data.position;
      this.setPosition();
      this.column = data.column;
    });
    this.svc$.columns.pipe(takeWhile(_ => this.subs)).subscribe((columns) => {
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
    this.svc$.setState(this.state$);
  }

  changeColumns(event: GridColumn[]) {
    this.svc$.updateColumns();
  }

  clickedOutside = (click: MouseEvent) => {
    this.column = null;
  };

  private setPosition() {
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
