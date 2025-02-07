import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { GridBodyBase } from '../../model/grid-body-base';
import { GridRow, IId } from '../../model/grid-row';
import { ItskGridService } from '../../service/itsk-grid.service';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { ItskGridCellComponent } from '../cell/itsk-grid-cell/itsk-grid-cell.component';
import { ItskCheckboxComponent } from '../../../itsk-checkbox/itsk-checkbox/itsk-checkbox.component';
import { FormsModule } from '@angular/forms';
import { ItskGridExpandComponent } from '../itsk-grid-expand/itsk-grid-expand.component';
import { GroupRowWrapperComponent } from '../row/group-row-wrapper/group-row-wrapper.component';
import { ItskGridAdditionalComponent } from '../itsk-grid-additional/itsk-grid-additional.component';

@Component({
    selector: 'itsk-grid-body',
    templateUrl: './itsk-grid-body.component.html',
    styleUrls: ['./itsk-grid-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, NgTemplateOutlet, NgClass, ItskGridCellComponent, ItskCheckboxComponent, FormsModule, ItskGridExpandComponent, GroupRowWrapperComponent, ItskGridAdditionalComponent]
})
export class ItskGridBodyComponent<T extends IId> extends GridBodyBase<T> {
  @Input() virtual: boolean = false;

  constructor(svc$: ItskGridService<T>, cdr$: ChangeDetectorRef) {
    super(svc$, cdr$);
  }

  selectGroup(row: GridRow<T>, value: boolean) {
    this.svc$.selectGroup(row, value);
  }

  isGroupSelected(row: GridRow<T>) {
    return this.svc$.isGroupSelected(row);
  }
}
