import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GridColumn } from '../../../model/grid-column';
import { HeadCellComponentBase } from '../../../model/head-cell-component-base';

@Component({
    selector: 'itsk-default-head-cell',
    templateUrl: './default-head-cell.component.html',
    styleUrls: ['./default-head-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DefaultHeadCellComponent extends HeadCellComponentBase implements OnInit {
  private column$?: GridColumn;

  @Input()
  set column(val: GridColumn) {
    this.column$ = val;
    this.cdr$.detectChanges();
  }

  get column(): GridColumn {
    return this.column$ as any;
  }

  private sorted$: boolean = false;

  @Input()
  set sorted(val: boolean) {
    this.sorted$ = val;
    this.cdr$.detectChanges();
  }

  get sorted(): boolean {
    return this.sorted$;
  }

  private asc$: boolean = false;

  @Input()
  set asc(val: boolean) {
    this.asc$ = val;
    this.cdr$.detectChanges();
  }

  get asc(): boolean {
    return this.asc$;
  }

  private filtered$: boolean = false;

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

  ngOnInit() {}
}
