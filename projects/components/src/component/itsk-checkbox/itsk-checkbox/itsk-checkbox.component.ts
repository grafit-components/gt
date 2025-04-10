import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItskIconComponent } from '../../itsk-icon/itsk-icon/itsk-icon.component';

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItskCheckboxComponent),
  multi: true,
};

@Component({
    selector: 'itsk-checkbox',
    templateUrl: './itsk-checkbox.component.html',
    styleUrls: ['./itsk-checkbox.component.scss'],
    providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ItskIconComponent]
})
export class ItskCheckboxComponent implements ControlValueAccessor, OnInit {
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('class.checkbox') checkboxClass = true;
  /** Компонент неактивен */
  @HostBinding('class.checkbox_disabled')
  @Input()
  disabled?: boolean;
  /** True/false или list */
  @Input() value: any;
  /** True/false или list */
  @Input() binary?: boolean;
  /** Значение, которое должена принимать модель, чтобы чекбокс был отмечен */
  @Input() trueValue: any = true;
  /** Значение, которое должена принимать модель, чтобы чекбокс был отмечен */
  @Input() falseValue: any = false;
  /** Значение */
  private model$: any = null;

  get model(): any {
    return this.model$;
  }

  set model(v: any) {
    if (v !== this.model$) {
      this.model$ = v;
      this.onChange(v);
    }
  }

  checked: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('click')
  changeValue() {
    if (this.disabled) {
      return;
    }
    if (this.binary) {
      this.model = this.model !== this.trueValue ? this.trueValue : this.falseValue;
    } else {
      if (!this.isChecked()) {
        this.addValue();
      } else {
        this.removeValue();
      }
    }
    this.checked = this.isChecked();
  }

  writeValue(model: any) {
    if (this.binary) {
      this.model$ = model;
    } else {
      if (model && model instanceof Array) {
        this.model$ = model;
      } else {
        this.model$ = [];
      }
    }
    this.checked = this.isChecked();
    this.cdr.markForCheck();
  }

  isChecked(): boolean {
    if (this.binary) {
      return this.model === this.trueValue;
    } else {
      return this.model && this.model.indexOf(this.value) >= 0;
    }
  }

  removeValue() {
    this.model = this.model.filter((val: any) => val !== this.value);
  }

  addValue() {
    if (this.model) {
      this.model = [...this.model, this.value];
    } else {
      this.model = [this.value];
    }
  }

  ngOnInit() {}

  onChange(_: any) {}

  onTouched() {}

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
