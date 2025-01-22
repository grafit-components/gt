import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { GridRow, IId } from '../../model/grid-row';
import { ItskGridService } from '../../service/itsk-grid.service';
import { ItskIconComponent } from '../../../itsk-icon/itsk-icon/itsk-icon.component';

@Component({
    selector: 'itsk-grid-expand',
    templateUrl: './itsk-grid-expand.component.html',
    styleUrls: ['./itsk-grid-expand.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskIconComponent]
})
export class ItskGridExpandComponent<T extends IId> implements OnInit {
  @Input() row?: GridRow<T>;

  constructor(private svc$: ItskGridService<T>) {}

  @HostListener('click')
  click() {
    if (this.row) {
      this.row.expanded = !this.row.expanded;
      this.svc$.toggleRow(this.row);
    }
  }

  ngOnInit(): void {}
}
