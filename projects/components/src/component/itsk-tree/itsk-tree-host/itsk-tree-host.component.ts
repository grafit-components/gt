import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ItskTreeControl} from '../model/itsk-tree-control';

@Component({
  selector: 'itsk-tree-host',
  templateUrl: './itsk-tree-host.component.html',
  styleUrls: ['./itsk-tree-host.component.scss']
})
export class ItskTreeHostComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() template: any;
  @Input() control?: ItskTreeControl;

  @HostBinding('class.tree__host') treeHost = true;

  constructor() {
  }

  ngOnInit() {
  }
}
