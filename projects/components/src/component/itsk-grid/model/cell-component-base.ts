import {GridRow, IId} from './grid-row';
import {GridColumn} from './grid-column';
import { ChangeDetectorRef, OnDestroy, OnInit, Directive } from '@angular/core';
import {ItskGridService} from '../service/itsk-grid.service';
import {ICellCoordinates} from './cell-coordinates';
import {takeWhile} from 'rxjs/operators';

@Directive()
export abstract class CellComponentBase<T extends IId> implements OnInit, OnDestroy {
  protected alive = true;

  private edit$: boolean;

  set edit(val: boolean) {
    this.edit$ = val;
    this.cdr$.markForCheck();
  }

  get edit(): boolean {
    return this.edit$;
  }

  abstract column: GridColumn;
  abstract row: GridRow<T>;

  protected constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
    this.init();
  }

  startEdit(): void {
  }

  stopEdit(): void {
  }

  cancelEdit(): void {
  }

  valueChanged() {
    this.svc$.changeValue({
      column: this.column,
      row: this.row
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
  }

  private init() {
    this.svc$.editRowStart.pipe(takeWhile(_ => this.alive))
      .subscribe((row: GridRow<T>) => {
        if (!this.column.editable) {
          return;
        }
        if (this.row === row && !this.edit) {
          this.edit = true;
        }
        if (this.row !== row && this.edit) {
          this.edit = false;
        }
      });

    this.svc$.editRowStop.pipe(takeWhile(_ => this.alive))
      .subscribe((row: GridRow<T>) => {
        if (!this.column.editable) {
          return;
        }
        if (this.row === row && this.edit) {
          this.edit = false;
          return;
        }
      });

    this.svc$.editCellStart.pipe(takeWhile(_ => this.alive))
      .subscribe((cell: ICellCoordinates<T>) => {
        if (!this.column.editable) {
          return;
        }
        if (this.row === cell.row && this.column.name === cell.column.name && !this.edit) {
          this.edit = true;
          this.startEdit();
        }
        if ((this.row !== cell.row || this.column.name !== cell.column.name) && this.edit) {
          this.edit = false;
        }
      });

    this.svc$.editCellStop.pipe(takeWhile(_ => this.alive))
      .subscribe((cell: ICellCoordinates<T>) => {
        if (!this.column.editable) {
          return;
        }
        if ((this.row === cell.row && this.column.name === cell.column.name) && this.edit) {
          this.stopEdit();
          this.edit = false;
        }
      });

    this.svc$.editCellCancel.pipe(takeWhile(_ => this.alive))
      .subscribe((cell: ICellCoordinates<T>) => {
        if (!this.column.editable) {
          return;
        }
        if ((this.row === cell.row && this.column.name === cell.column.name) && this.edit) {
          this.cancelEdit();
          this.edit = false;
        }
      });
  }
}
