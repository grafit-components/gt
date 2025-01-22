import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'itsk-hint-container',
    templateUrl: './itsk-hint-container.component.html',
    styleUrls: ['./itsk-hint-container.component.scss'],
})
export class ItskHintContainerComponent implements OnInit {
  @HostBinding('class')
  @Input()
  class?: string | string[];

  @HostBinding('style.z-index')
  @Input()
  zIndex?: number;

  @HostBinding('style.bottom.px')
  @Input()
  bottom?: number;

  @HostBinding('style.top.px')
  @Input()
  top?: number;

  @HostBinding('style.left.px')
  @Input()
  left?: number;

  @HostBinding('style.right.px')
  @Input()
  right?: number;

  @HostBinding('class.hint__container')
  hintContainer = true;

  constructor() {}

  ngOnInit() {}
}
