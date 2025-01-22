import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ClickOutsideBase } from './click-outside-base';

@Directive({
    selector: '[itskClickOutside]',
    standalone: false
})
export class ItskClickOutsideDirective extends ClickOutsideBase implements OnDestroy {
  private visible$ = false;
  @Output() public itskClickOutside = new EventEmitter<MouseEvent>();

  @Input() rightClick = false;

  @Input()
  set visible(val: boolean) {
    this.visible$ = val;
    if (this.visible$) {
      this.addListener(this.rightClick);
    } else {
      this.removeListener(this.rightClick);
    }
  }

  get visible() {
    return this.visible$;
  }

  constructor(private elementRef$: ElementRef) {
    super(elementRef$.nativeElement);
  }

  ngOnDestroy() {
    this.removeListener(this.rightClick);
  }

  // addListener() {
  //   window.addEventListener('click', this.listener);
  //   if (this.rightClick) {
  //     window.addEventListener('contextmenu', this.listener);
  //   }
  // }
  //
  // removeListener() {
  //   window.removeEventListener('click', this.listener);
  //   if (this.rightClick) {
  //     window.removeEventListener('contextmenu', this.listener);
  //   }
  // }
  //
  // listener = (click: MouseEvent) => {
  //   if (!this.visible) {
  //     return;
  //   }
  //   const clickedInside = this.elementRef$.nativeElement.contains(click.target);
  //   if (!clickedInside) {
  //     this.itskClickOutside.emit(click);
  //   }
  // };
  //
  clickedOutside = (click: MouseEvent) => {
    this.itskClickOutside.emit(click);
  };
}
