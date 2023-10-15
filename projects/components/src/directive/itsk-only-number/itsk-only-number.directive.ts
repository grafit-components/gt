import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[itskOnlyNumber]'
})
export class ItskOnlyNumberDirective implements OnInit, OnDestroy {
  value: any;
  @Input() ngModel: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  element: HTMLElement;
  regexStr = /^-?\d*\.?\d*$/;
  regEx: RegExp;

  bindListener = this.listener.bind(this);

  listener(e: any) {
    if (!this.regEx.test(this.ngModel)) {
      this.ngModelChange.emit(this.value);
    } else {
      this.value = this.ngModel;
    }
  }

  constructor(private elementRef$: ElementRef) {
    this.regEx = new RegExp(this.regexStr);
    this.element = this.elementRef$.nativeElement as HTMLElement;
  }

  @Input()
  set itskOnlyNumber(value: string | undefined) {
    if (value && value.length > 0) {
      this.regEx = new RegExp(value);
    }
  }

  ngOnInit() {
    if (this.ngModel && !this.regEx.test(this.ngModel)) {
      this.value = '';
      this.ngModelChange.emit(this.value);
    } else {
      this.value = this.ngModel;
    }
    this.element.addEventListener('input', this.bindListener);
  }

  ngOnDestroy() {
    this.element.removeEventListener('input', this.bindListener);
  }
}
