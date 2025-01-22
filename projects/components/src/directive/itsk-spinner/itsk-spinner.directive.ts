import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[itskSpinner]',
    standalone: false
})
export class ItskSpinnerDirective implements OnInit {
  private element$: HTMLElement;
  private spinner$: any;

  private itskSpinner$: boolean = false;

  @Input()
  set itskSpinner(value: boolean) {
    this.itskSpinner$ = value;
    if (this.itskSpinner$) {
      this.showMask();
    } else {
      this.hideMask();
    }
  }

  get itskSpinner() {
    return this.itskSpinner$;
  }

  constructor(private elementRef$: ElementRef) {
    this.element$ = this.elementRef$.nativeElement;
    this.element$.classList.add('relative');
  }

  ngOnInit() {}

  showMask() {
    if (this.spinner$ === null || this.spinner$ === undefined) {
      this.spinner$ = document.createElement('div');
      this.spinner$.setAttribute('class', 'spinner');
      this.element$.appendChild(this.spinner$);
    }
  }

  hideMask() {
    if (this.spinner$ && this.spinner$.parentElement) {
      this.spinner$.parentElement.removeChild(this.spinner$);
      this.spinner$ = null;
    }
  }
}
