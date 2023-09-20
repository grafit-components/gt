import {
  AfterContentChecked,
  ContentChildren,
  Directive,
  EventEmitter,
  Output,
  QueryList
} from '@angular/core';
import {ItskValidateDirective} from './itsk-validate.directive';

@Directive({
  selector: '[itskValidateGroup]'
})
export class ItskValidateGroupDirective implements AfterContentChecked {
  @Output() itskValidateGroup: EventEmitter<boolean> = new EventEmitter();

  @Output() errors: EventEmitter<string[]> = new EventEmitter();
  @Output() warnings: EventEmitter<string[]> = new EventEmitter();

  @ContentChildren(ItskValidateDirective) validators: QueryList<ItskValidateDirective>;
  invalid: boolean;

  constructor() {
  }

  ngAfterContentChecked() {
    setTimeout(() => {
      if (this.validators && this.validators.length) {
        const invalid = this.validators.filter((x) => {
          return x.error;
        });
        const warnings = this.validators.filter((x) => {
          return x.warn;
        });
        this.invalid = invalid && invalid.length > 0;
        this.itskValidateGroup.emit(this.invalid);
        if (invalid) {
          this.errors.emit(invalid.map((x) => {
            return x.errorMessage;
          }));
        }
        if (warnings && warnings.length) {
          this.warnings.emit(warnings.map((x) => {
            return x.warningMessage;
          }));
        }
      }
    });
  }
}
