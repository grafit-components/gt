import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[itskFocus]'
})
export class ItskFocusDirective implements OnInit {
  element: HTMLElement;

  private _appItskFocus: boolean;
  @Input()
  set appItskFocus(value: boolean) {
    this._appItskFocus = value;
    if (this._appItskFocus) {
      this.focus();
    }
  }

  get appItskFocus() {
    return this._appItskFocus;
  }

  constructor(private _elementRef: ElementRef) {
    this.element = this._elementRef.nativeElement as HTMLElement;
  }

  ngOnInit() {
  }

  focus() {
    this.element.focus();
  }
}
