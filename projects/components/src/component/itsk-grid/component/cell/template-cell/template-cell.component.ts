import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {CellComponentBase} from '../../../model/cell-component-base';
import {GridRow, IId} from '../../../model/grid-row';
import {GridColumn} from '../../../model/grid-column';
import {ItskGridService} from '../../../service/itsk-grid.service';

@Component({
  selector: 'itsk-template-cell',
  templateUrl: './template-cell.component.html',
  styleUrls: ['./template-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateCellComponent<T extends IId> extends CellComponentBase<T> implements OnInit {
  @Input() column: GridColumn;
  @Input() row: GridRow<any>;

  template: TemplateRef<any>;

  constructor(protected svc$: ItskGridService<T>, protected cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  ngOnInit() {
    super.ngOnInit();
    this.template = this.getTemplate();
  }

  getTemplate() {
    if (!this.column.parameters || !this.column.parameters.template) {
      throw new Error('column.parameters.template must be set');
    }
    return this.column.parameters.template;
  }
}
