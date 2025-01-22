import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[itskDisableControl]',
    standalone: false
})
export class ItskDisableControlDirective {
  @Input() set itskDisableControl(val: boolean) {
    if (this.ngControl.control) {
      if (val) {
        this.ngControl.control.disable();
      } else {
        this.ngControl.control.enable();
      }
    }
  }

  constructor(private ngControl: NgControl) {}
}
