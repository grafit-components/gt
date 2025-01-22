import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItskToggleComponent),
  multi: true,
};

@Component({
    selector: 'itsk-toggle',
    templateUrl: './itsk-toggle.component.html',
    styleUrls: ['./itsk-toggle.component.scss'],
    providers: [TOGGLE_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ItskToggleComponent implements ControlValueAccessor, OnInit {
  @HostBinding('class.toggle') toggleClass = true;
  @HostBinding('attr.tabindex') tabindex = 0;
  @Input() leftLabel?: boolean;
  @Input() trueColor?: string;
  @Input() falseColor?: string;
  /** Css класс, который будет применен к input */
  @Input() className?: string[];
  /** Компонент неактивен */
  @HostBinding('class.toggle_disabled')
  @Input()
  disabled?: boolean;
  /** Значение */
  value$ = false;

  get value(): any {
    return this.value$;
  }

  set value(v: any) {
    if (v !== this.value$) {
      this.value$ = v;
      this.onChange(v);
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('click')
  changeValue = () => {
    if (this.disabled) {
      return;
    }
    this.value = !this.value || this.value !== true;
  };

  writeValue(value: any) {
    this.value$ = value;
    this.cdr.markForCheck();
  }

  ngOnInit() {}

  onChange = (_: any) => {};

  onTouched = () => {};

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

  getStyle() {
    if (this.value$ && this.trueColor) {
      return {
        background: this.trueColor,
      };
    }
    if (!this.value$ && this.falseColor) {
      return {
        background: this.falseColor,
      };
    }
    return null;
  }
}
