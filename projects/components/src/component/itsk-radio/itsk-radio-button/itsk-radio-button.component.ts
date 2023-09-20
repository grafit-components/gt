import {
  Component, OnInit, Host, OnDestroy,
  ViewContainerRef, Input, HostListener, HostBinding, ViewEncapsulation
} from '@angular/core';
import {ItskRadioComponent} from '../itsk-radio/itsk-radio.component';

@Component({
  selector: 'itsk-radio-button',
  templateUrl: './itsk-radio-button.component.html',
  styleUrls: ['./itsk-radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItskRadioButtonComponent implements OnInit, OnDestroy {

  private _value: any;
  @HostBinding('class.radio__button')
  radioButton = true;

  @HostBinding('class.radio-selected')
  selected: boolean;

  @Input()
  @HostBinding('class.radio-checked')
  checked: boolean;

  @Input()
  @HostBinding('class.radio__button_disabled')
  disabled: boolean;

  @Input() set value(val: any) {
    this._value = val;
  }

  get value() {
    if (this._value === undefined) {
      if (this.container.element.nativeElement instanceof HTMLElement) {
        return this.container.element.nativeElement.innerText;
      }
    }
    return this._value;
  }

  constructor(
    private container: ViewContainerRef,
    @Host() public radio: ItskRadioComponent) {
  }

  ngOnInit() {
    this.radio._addButton(this);
  }

  ngOnDestroy(): void {
    this.radio._removeButton(this);
  }

  @HostListener('click')
  hostClick() {
    if (!this.disabled) {
      this.radio._setChecked(this);
    }
  }
}
