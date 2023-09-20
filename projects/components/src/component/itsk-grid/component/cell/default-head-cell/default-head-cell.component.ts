import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';
import {HeadCellComponentBase} from '../../../model/head-cell-component-base';
import {GridColumn} from '../../../model/grid-column';

@Component({
  selector: 'itsk-default-head-cell',
  templateUrl: './default-head-cell.component.html',
  styleUrls: ['./default-head-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultHeadCellComponent extends HeadCellComponentBase implements OnInit {
  private column$: GridColumn;

  @Input()
  set column(val: GridColumn) {
    this.column$ = val;
    this.cdr$.detectChanges();
  }

  get column(): GridColumn {
    return this.column$;
  }

  private sorted$: boolean;

  @Input()
  set sorted(val: boolean) {
    this.sorted$ = val;
    this.cdr$.detectChanges();
  }

  get sorted(): boolean {
    return this.sorted$;
  }

  private asc$: boolean;

  @Input()
  set asc(val: boolean) {
    this.asc$ = val;
    this.cdr$.detectChanges();
  }

  get asc(): boolean {
    return this.asc$;
  }

  private filtered$: boolean;

  @Input()
  set filtered(val: boolean) {
    this.filtered$ = val;
    this.cdr$.detectChanges();
  }

  get filtered(): boolean {
    return this.filtered$;
  }


  constructor(private cdr$: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
  }
}
