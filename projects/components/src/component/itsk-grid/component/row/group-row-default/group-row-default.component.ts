import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GridColumn} from '../../../model/grid-column';
import {GridRow, IId} from '../../../model/grid-row';
import {GroupRowComponentBase} from '../../../model/group-row-component-base';

@Component({
  selector: 'itsk-group-row-default',
  templateUrl: './group-row-default.component.html',
  styleUrls: ['./group-row-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupRowDefaultComponent<T extends IId> extends GroupRowComponentBase<T> implements OnInit {
  @Input() override row?: GridRow<T>;
  @Input() override columns?: GridColumn[];

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
