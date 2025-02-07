import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, HostBinding, Input, OnInit } from '@angular/core';
import { ItskTreeTemplateDirective } from '../itsk-tree-template.directive';
import { ItskTreeControl } from '../model/itsk-tree-control';
import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';
import { ItskTreeHostComponent } from '../itsk-tree-host/itsk-tree-host.component';

@Component({
    selector: 'itsk-tree',
    templateUrl: './itsk-tree.component.html',
    styleUrls: ['./itsk-tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgFor, NgTemplateOutlet, NgIf, ItskTreeHostComponent]
})
export class ItskTreeComponent implements OnInit, AfterViewInit {
  /** Tree data */
  @Input() data: any[] = [];

  /** All child nodes are open at the beginning */
  @Input() open: boolean = false;

  /** All child nodes are open at the beginning */
  @Input() control?: ItskTreeControl;

  @HostBinding('class.tree__container') treeContainer = true;

  @ContentChild(ItskTreeTemplateDirective, { static: false }) template?: ItskTreeTemplateDirective;

  constructor() {}

  ngOnInit() {
    if (this.control === null || this.control === undefined) {
      this.control = new ItskTreeControl(this.data, this.open);
    }
  }

  ngAfterViewInit(): void {}
}
