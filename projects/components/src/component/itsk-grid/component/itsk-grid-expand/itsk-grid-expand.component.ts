import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { GridRow, IId } from '../../model/grid-row';
import { ItskGridService } from '../../service/itsk-grid.service';

@Component({
    selector: 'itsk-grid-expand',
    templateUrl: './itsk-grid-expand.component.html',
    styleUrls: ['./itsk-grid-expand.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
