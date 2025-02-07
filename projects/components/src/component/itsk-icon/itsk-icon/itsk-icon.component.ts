import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { iconName } from '../icon-name';
import { NgClass } from '@angular/common';

@Component({
    selector: 'itsk-icon',
    templateUrl: './itsk-icon.component.html',
    styleUrls: ['./itsk-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class ItskIconComponent implements OnInit {
  @Input()
  name?: iconName | string;

  get iconId() {
    return `#${this.name}`;
  }

  @Input()
  cssClass?: string;

  constructor() {}

  ngOnInit(): void {}
}
