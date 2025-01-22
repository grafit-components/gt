import { Component, HostBinding, OnInit } from '@angular/core';
import { ItskTreeComponent } from '../itsk-tree/itsk-tree.component';

@Component({
    selector: 'itsk-tree-item',
    templateUrl: './itsk-tree-item.component.html',
    styleUrls: ['./itsk-tree-item.component.scss'],
    standalone: false
})
export class ItskTreeItemComponent implements OnInit {
  @HostBinding('class.tree__item') treeHost = true;

  constructor(private tree: ItskTreeComponent) {}

  ngOnInit() {}
}
