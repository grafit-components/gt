import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CellComponentBase, GridColumn, GridRow, ItskGridService } from '@grafit/angular';
import { DataModel } from '../../../model/data-model';

@Component({
  selector: 'app-bool-cell',
  templateUrl: './bool-cell.component.html',
  styleUrls: ['./bool-cell.component.styl'],
})
export class BoolCellComponent extends CellComponentBase<DataModel> implements OnInit {
  @Input() column: GridColumn;
  @Input() row: GridRow<DataModel>;

  constructor(
    protected svc$: ItskGridService<DataModel>,
    protected cdr$: ChangeDetectorRef,
  ) {
    super(svc$, cdr$);
  }

  ngOnInit(): void {}
}
