import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, HostListener, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItskRadioButtonComponent } from '../itsk-radio-button/itsk-radio-button.component';

type ButtonOrNullOrUndefined = ItskRadioButtonComponent | undefined | null;

@Component({
    selector: 'itsk-radio',
    templateUrl: './itsk-radio.component.html',
    styleUrls: ['./itsk-radio.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ItskRadioComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskRadioComponent implements OnInit, ControlValueAccessor {
  //#region Props
  private buttons$: ItskRadioButtonComponent[] = [];
  private checkedButton$: ButtonOrNullOrUndefined;
  private selectedButton$: ButtonOrNullOrUndefined;
  private disabled$ = false;

  @HostBinding('tabindex') tabindex = 0;
  @HostBinding('class.radio') radioClass = true;

  //#endregion

  //#region Inputs

  /** Менять значение при изменении выбранного */
  @Input()
  @HostBinding('class.radio_inline')
  inline: boolean = false;

  @Input() checkChangeSelected = true;

  @Input() set disabled(val: boolean) {
    this.disabled$ = val;
    this.buttons$.forEach((b) => (b.disabled = this.disabled));
  }

  get disabled() {
    return this.disabled$;
  }

  @Input() get value(): any {
    if (this.checkedButton$) {
      return this.checkedButton$.value;
    }
    return null;
  }

  set value(val: any) {
    this.writeValue(val);
  }

  //#endregion

  //#region Angular
  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}

  //#endregion

  //#region Focus

  @HostListener('focus', ['$event'])
  focusHandler(event: FocusEvent) {
    this.selectFirst();
  }

  @HostListener('focusout', ['$event'])
  focusoutHandler(event: FocusEvent) {
    if (this.selectedButton$) {
      this.selectedButton$.selected = false;
      this.selectedButton$ = null;
    }
  }

  //#endregion

  //#region Hot keys

  @HostListener('keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const key = event.code || event.key;
    switch (key) {
      case 'Space':
      case 'Enter':
      case 'Spacebar':
        this.checkSelected();
        break;

      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
        this.selectPrevious();
        break;

      case 'ArrowDown':
      case 'Down':
      case 'ArrowRight':
      case 'Right':
        this.selectNext();
        break;
      default:
        return;
    }

    event.cancelBubble = true;
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    return false;
  }

  selectFirst() {
    if (!this.selectedButton$) {
      if (this.checkedButton$) {
        this.selectedButton$ = this.checkedButton$;
        this.selectedButton$.selected = true;
        return true;
      }

      for (const btn of this.buttons$) {
        if (!btn.disabled) {
          this.selectedButton$ = btn;
          this.selectedButton$.selected = true;
          return true;
        }
      }
    }
    return false;
  }

  private selectBtn(btn: ItskRadioButtonComponent) {
    if (this.selectedButton$) {
      this.selectedButton$.selected = false;
    }
    this.selectedButton$ = btn;
    this.selectedButton$.selected = true;
    if (this.checkChangeSelected) {
      this.checkSelected();
    }
    this.changeDetector.markForCheck();
  }

  private selectNext() {
    if (this.selectFirst()) {
      return;
    }

    const length = this.buttons$.length;
    let newIndex = this.selectedButton$ ? this.buttons$.indexOf(this.selectedButton$) : 0;
    let firstCycle = true;
    do {
      newIndex++;
      if (firstCycle && newIndex === length) {
        newIndex = 0;
        firstCycle = false;
      }
      const btn = this.buttons$[newIndex];
      if (btn && !btn.disabled) {
        this.selectBtn(btn);
        return;
      }
    } while (newIndex < length);
  }

  private selectPrevious() {
    if (this.selectFirst()) {
      return;
    }

    let newIndex = this.selectedButton$ ? this.buttons$.indexOf(this.selectedButton$) : 0;
    let firstCycle = true;
    do {
      newIndex--;
      if (firstCycle && newIndex === -1) {
        newIndex = this.buttons$.length - 1;
        firstCycle = false;
      }
      const btn = this.buttons$[newIndex];
      if (btn && !btn.disabled) {
        this.selectBtn(btn);
        return;
      }
    } while (newIndex >= 0);
  }

  private checkSelected() {
    if (this.selectFirst()) {
      return;
    }
    if (this.selectedButton$) {
      this._setChecked(this.selectedButton$);
    }
  }

  //#endregion

  //#region For Buttons

  _setChecked(btn: ItskRadioButtonComponent) {
    if (this.checkedButton$) {
      this.checkedButton$.checked = false;
    }
    this.checkedButton$ = btn;
    this.checkedButton$.checked = true;
    if (this.selectedButton$) {
      this.selectedButton$.selected = false;
    }
    this.selectedButton$ = btn;
    this.selectedButton$.selected = true;
    this._onChange(this.value);
    this.changeDetector.markForCheck();
  }

  _addButton(btn: ItskRadioButtonComponent) {
    if (this.disabled) {
      btn.disabled = this.disabled;
    }
    return this.buttons$.push(btn) - 1;
  }

  _removeButton(btn: ItskRadioButtonComponent) {
    const index = this.buttons$.indexOf(btn);
    if (index > -1) {
      this.buttons$.splice(index, 1);
    }
  }

  //#endregion

  //#region ControlValueAccessor

  /** Writes a new value to the element. */
  writeValue(obj: any): void {
    if (this.checkedButton$) {
      this.checkedButton$.checked = false;
    }

    this.checkedButton$ = this.buttons$.find((b) => b.value === obj);
    if (this.checkedButton$) {
      this.checkedButton$.checked = true;
    }
    this.changeDetector.markForCheck();
  }

  /** Model callback вызовется когда модель измениться из ui */
  _onChange: (value: any) => void = () => {};

  /** Registers a callback function that should be called when the control's value changes in the UI */
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  _onTouched = () => {};

  /** Registers a callback function that should be called when the control receives a blur event. */
  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  /** This function is called by the forms API when the control status changes to or from "DISABLED". */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetector.markForCheck();
  }

  //#endregion
}
