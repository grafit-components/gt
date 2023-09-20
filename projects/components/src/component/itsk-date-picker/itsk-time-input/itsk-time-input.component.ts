import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ItskRange} from '../model/itsk-range';
import {NumberUtil} from '../../../util/number-util';
import {ArrayUtil} from '../../../util/array-util';

export const TIME_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItskTimeInputComponent),
  multi: true
};

@Component({
  selector: 'itsk-time-input',
  templateUrl: './itsk-time-input.component.html',
  styleUrls: ['./itsk-time-input.component.scss'],
  providers: [TIME_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ItskTimeInputComponent implements OnInit, ControlValueAccessor {
  /**
   * Компонент неактивен
   */
  @Input() disabled: boolean;
  /**
   * Отображать ввод секунд
   */
  @Input() showSecond = false;

  get showFormat(): boolean {
    return (this.value$ !== null && this.value$ !== undefined) || this.active || !this.isEmpty;
  }

  active: boolean;
  borderless: boolean;

  public formatValue: any = {
    HH: '__',
    mm: '__',
    ss: '__'
  };
  allowableRange: any = {
    HH: [0, 23],
    mm: [0, 59],
    ss: [0, 59],
  };
  element: HTMLElement;
  inputElement: HTMLElement;
  isWindowPressEventListenerRegistered = false;
  /**
   * активная часть контролла даты
   */
  currentFormatPart$ = '';
  /**
   * формат отображения даты
   */
  format$: string;
  formatList$: string[];
  formatEssentialList$: string[];

  get format(): string {
    return this.format$;
  }

  set format(value: string) {
    this.formatList$ = value.split(/\b/);
    this.formatEssentialList$ = this.formatList$.filter(this.isEditableFormat);
    this.format$ = value;
  }

  /**
   * Текущая дата
   */
  value$: Date | null = null;

  get value(): Date | null {
    return this.value$;
  }

  set value(v: Date | null) {
    const vIsNull = v === null || v === undefined;
    const valueIsNull = this.value$ === null || this.value$ === undefined;
    if (vIsNull && valueIsNull) {
      return;
    }
    if ((v && !this.value$) ||
      (!v && this.value$) ||
      (v && this.value$ && v.getTime() !== this.value$.getTime())) {
      this.value$ = v;
      this.onChange(v);
    }
  }

  /**
   * Текущий год
   */
  currentYear$: number;

  get currentYear(): number {
    return this.currentYear$;
  }

  set currentYear(v: number) {
    if (v !== this.currentYear$) {
      this.currentYear$ = v;
    }
  }

  /**
   * Текущий месяц
   */
  currentMonth$: number;

  get currentMonth(): number {
    return this.currentMonth$;
  }

  set currentMonth(v: number) {
    if (v < 0 || v > 11) {
      return;
    }
    if (v !== this.currentMonth$) {
      this.currentMonth$ = v;
    }
  }

  /**
   * Текущий день
   */
  currentDate$: number;

  get currentDate(): number {
    return this.currentDate$;
  }

  set currentDate(v: number) {
    if (v < 0 || v > 31) {
      return;
    }
    if (v !== this.currentDate$) {
      this.currentDate$ = v;
    }
  }

  /**
   * Текущий час
   */
  currentHour$: number;

  get currentHour(): number {
    return this.currentHour$;
  }

  set currentHour(v: number) {
    let newVal = v;
    if (v < 0) {
      newVal = 0;
    }
    if (v > 23) {
      newVal = 23;
    }
    this.currentHour$ = newVal;
    this.formatValue.HH = this.formatTime(v);
  }

  /**
   * Текущая минута
   */
  currentMinute$: number;

  get currentMinute(): number {
    return this.currentMinute$;
  }

  set currentMinute(v: number) {
    let newVal = v;
    if (v < 0) {
      newVal = 0;
    }
    if (v > 59) {
      newVal = 59;
    }
    this.currentMinute$ = newVal;
    this.formatValue.mm = this.formatTime(v);
  }

  /**
   * Текущая секунда
   */
  currentSecond$: number;

  get currentSecond(): number {
    return this.currentSecond$;
  }

  set currentSecond(v: number) {
    let newVal = v;
    if (v < 0) {
      newVal = 0;
    }
    if (v > 59) {
      newVal = 59;
    }
    this.currentSecond$ = newVal;
    this.formatValue.ss = this.formatTime(v);
  }

  get isEmpty(): boolean {
    return this.formatEssentialList$.every((_: any) => this.formatValue[_].split('').every((__: any) => __ === '_'));
  }

  constructor(private elementRef$: ElementRef,
              private cdr$: ChangeDetectorRef) {
    this.setDefaults();
  }

  writeValue(value: any) {
    this.value$ = value;
    this.initFormatValue();
    this.initPicker(value);
    this.cdr$.markForCheck();
  }

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.element = this.elementRef$.nativeElement as HTMLElement;
    this.inputElement = this.elementRef$.nativeElement.querySelector('.datepicker__input') as HTMLElement;
    if (this.showSecond) {
      this.format = 'HH:mm:ss';
    } else {
      this.format = 'HH:mm';
    }
    this.initFormatValue();
  }

  setDefaults() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.currentDate = today.getDate();
    this.currentHour = 0;
    this.currentMinute = 0;
    this.currentSecond = 0;
  }

  initPicker(date: Date) {
    if (date === null || date === undefined || !(date instanceof Date) || isNaN(date.getTime())) {
      this.setDefaults();
    } else {
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth();
      this.currentDate = date.getDate();
      this.currentHour = date.getHours();
      this.currentMinute = date.getMinutes();
      this.currentSecond = date.getSeconds();
    }
  }

  private getInputDate(): Date {
    return new Date(this.currentYear, this.currentMonth, this.currentDate, +this.formatValue.HH, +this.formatValue.mm, +this.formatValue.ss);
  }

  private getPrevFormat(currentFormat: string, format: string): ItskRange | null {
    const prevNameRegExp = /(\b)\w+(\b|$)/g;
    const reverseFormat = format.split('').reverse().join('');
    const reverseCurrentFormat = currentFormat.split('').reverse().join('');
    prevNameRegExp.lastIndex = reverseFormat.indexOf(reverseCurrentFormat) + reverseCurrentFormat.length;
    const exec = prevNameRegExp.exec(reverseFormat);
    if (!exec) {
      return null;
    }

    return {
      name: exec[0].split('').reverse().join(''),
      start: format.length - exec.index,
      end: format.length - (exec.index + exec[0].length)
    };
  }

  private getNextFormat(currentFormat: string, format: string): ItskRange | null {
    const nextNameRegExp = /(\b)\w+(\b|$)/g;
    nextNameRegExp.lastIndex = format.indexOf(currentFormat) + currentFormat.length;
    const exec = nextNameRegExp.exec(format);
    if (!exec) {
      return null;
    }

    return {
      name: exec[0],
      start: exec.index,
      end: exec.index + exec[0].length
    };
  }

  isEditableFormat(value: string) {
    return /\w+/.test(value);
  }

  getRangeNode(formatName: string): Node | null {
    return this.inputElement.querySelector(`[data-format="${formatName}"]`);
  }

  jumpToFormat(format: any): void {
    const rangeNode = this.getRangeNode(format.name);
    if (rangeNode) {
      this.elementSelection(rangeNode);
    }
    this.currentFormatPart$ = format.name;
  }

  saveValue() {
    this.value = this.getInputDate();
  }

  saveInput(valueList: string[], format: string, transitionToNextFormat: boolean = true): void {
    this.formatValue[format] = valueList.join('');
    if (valueList.every(_ => NumberUtil.isNumeric(+_))) {
      if (transitionToNextFormat) {
        this.goToNextFormat(format);
      }
    }
    this.cdr$.markForCheck();
  }

  appendToFormat(format: string, x: number): void {
    const [minRange, maxRange] = this.allowableRange[this.currentFormatPart$];
    let newValue = (+this.formatValue[format] || 0) + x;
    if (newValue < minRange) {
      newValue = maxRange;
    }
    if (newValue > maxRange) {
      newValue = minRange;
    }
    const valueList = this.formatTime(newValue, 2).split('');
    this.saveInput(valueList, format, false);
  }

  goToPrevFormat(format: string): void {
    const prevFormat = this.getPrevFormat(format, this.format);
    if (prevFormat) {
      this.jumpToFormat(prevFormat);
    }
  }

  goToNextFormat(format: string): void {
    const nextFormat = this.getNextFormat(format, this.format);
    if (nextFormat) {
      this.jumpToFormat(nextFormat);
    }
  }

  onWindowPress = (event: KeyboardEvent) => {
    if (event.defaultPrevented || !this.active) {
      return;
    }

    const key = event.key || event.keyCode;

    const allowableRange = this.allowableRange[this.currentFormatPart$];
    let valueList = this.formatValue[this.currentFormatPart$].split('');

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.activate(false);
      this.initFormatValue(this.value);
    }

    if (key === 'Backspace' || key === 8) {
      event.preventDefault();
    }

    if (key === 'Enter' || key === 13) {
      this.activate(false);
    }

    if (key === 'Tab' || key === 9) {
      this.activate(false);
    }

    if (key === 'ArrowLeft' || key === 'left' || key === 37) {
      this.goToPrevFormat(this.currentFormatPart$);
    }

    if (key === 'ArrowUp' || key === 'Up' || key === 38) {
      this.appendToFormat(this.currentFormatPart$, 1);
      return;
    }

    if (key === 'ArrowDown' || key === 'Down' || key === 40) {
      this.appendToFormat(this.currentFormatPart$, -1);
      return;
    }

    if (key === 'ArrowRight'
      || key === 'right'
      || key === 39
      || key === ','
      || key === 188
      || key === '.'
      || key === 190) {
      if (valueList.every((_: any) => NumberUtil.isNumeric(+_))) {
        this.saveInput(valueList, this.currentFormatPart$);
      } else {
        if (valueList.every((_: any) => _ === '_')) {
          this.goToNextFormat(this.currentFormatPart$);
        } else {
          valueList.unshift('0');
          valueList = valueList.slice(0, this.currentFormatPart$.length);
          if (this.isBelong(valueList, allowableRange)) {
            this.saveInput(valueList, this.currentFormatPart$);
          }
        }
      }
    }

    if (key === 'Backspace' || key === 8 ||
      key === 'Delete' || key === 'Del' || key === 46) {
      if (valueList.every((_: any) => _ === '_')) {
        this.goToPrevFormat(this.currentFormatPart$);
      } else {
        valueList = valueList.map(() => '_');
        this.saveInput(valueList, this.currentFormatPart$);
        this.jumpToFormat({
          name: this.currentFormatPart$
        });
      }
    }

    if (!/^\d+$/.test(event.key)) {
      return;
    }
    if (valueList.every((_: any) => NumberUtil.isNumeric(+_))) {
      valueList = valueList.map(() => '_');
    }
    const inputPosition = valueList.indexOf('_');
    valueList[inputPosition] = event.key;

    if (valueList.every((_: any) => NumberUtil.isNumeric(+_))) {
      if (this.isBelong(valueList, allowableRange)) {
        this.saveInput(valueList, this.currentFormatPart$);
      }
    } else if (this.isBelong(valueList, allowableRange)) {
      this.saveInput(valueList, this.currentFormatPart$);
    } else {
      valueList.unshift('0');
      valueList = valueList.slice(0, this.currentFormatPart$.length);
      if (this.isBelong(valueList, allowableRange)) {
        this.saveInput(valueList, this.currentFormatPart$);
      }
    }
    this.cdr$.detectChanges();
  };

  windowPressEventListenerRegister = (): void => {
    if (this.isWindowPressEventListenerRegistered) {
      return;
    }
    document.addEventListener('keydown', this.onWindowPress, false);
    this.isWindowPressEventListenerRegistered = true;
  };

  windowPressEventListenerUnRegister = (): void => {
    if (!this.isWindowPressEventListenerRegistered) {
      return;
    }
    document.removeEventListener('keydown', this.onWindowPress, false);
    this.isWindowPressEventListenerRegistered = false;
  };

  removeAllSelection = (): void => {
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  elementSelection = (element: Node): void => {
    const rng = document.createRange();
    rng.selectNode(element);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(rng);
    }
  };

  dataPartFocus = (e: any, format: string): void => {
    if (this.disabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.elementSelection(e.target);
    if (this.currentFormatPart$ !== format) {
      this.currentFormatPart$ = format;
    }
    this.activate(true);
  };

  dataPartScroll = (e: any, format: string): void => {
    if (!this.active) {
      return;
    }
    e.preventDefault();
    if (this.currentFormatPart$ !== format) {
      this.jumpToFormat({
        name: format
      });
    }
    this.appendToFormat(format, e.deltaY > 0 ? 1 : -1);
  };

  dataInputDoubleClick = (e: any): void => {
    e.preventDefault();
    e.stopPropagation();
    this.elementSelection(this.inputElement);
    this.currentFormatPart$ = 'HH';
  };

  private isBelong = (valueList: string[], band: number[]): boolean => {
    const [minRange, maxRange] = band;
    const capacity = maxRange.toString().length;
    if (valueList.length !== capacity) {
      throw new Error('Can\'t identity belong of value to range');
    }
    const rangeList = ArrayUtil.getSequence(minRange, maxRange);
    const capacityList = ArrayUtil.getSequence(1, capacity);

    if (valueList.every(_ => NumberUtil.isNumeric(+_))) {
      const value = +valueList.join('');
      return rangeList.indexOf(value) !== -1;
    }

    return rangeList.some((_) => {
      return capacityList.every((digit) => {
        const valueIndex = capacity - digit;
        // tslint:disable-next-line:no-bitwise
        return isNaN(+valueList[valueIndex]) || +valueList[valueIndex] === (((_ / Math.pow(10, digit - 1)) % 10) | 0);
      });
    });
  };

  initFormatValue = (value: Date | null = null): void => {
    value = value || this.value;
    if (value) {
      this.formatValue = {
        HH: this.formatTime(value.getHours()),
        mm: this.formatTime(value.getMinutes()),
        ss: this.formatTime(value.getSeconds())
      };
    } else {
      this.formatValue = this.formatEssentialList$.reduce((sum: any, current) => {
        sum[current] = '_'.repeat(current.length);
        return sum;
      }, {});
    }
  };

  initFormatMaskValue = (): void => {
    this.formatValue = this.formatEssentialList$.reduce((sum: any, current) => {
      sum[current] = '_'.repeat(current.length);
      return sum;
    }, {});
  };

  preventEvent = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    return false;
  };


  formatTime = (time: number, length: number = 2): string => {
    let result = '';
    if (time === null || time === undefined || isNaN(time)) {
      result = '_'.repeat(length);
    } else {
      result = `${'0'.repeat(length - time.toString().length)}${time.toString()}`;
    }
    return result;
  };


  activate(value: boolean) {
    if (this.disabled || this.active === value) {
      return;
    }
    this.active = value;
    if (this.active) {
      this.windowPressEventListenerRegister();
      window.setTimeout(() => {
        this.jumpToFormat({
          name: this.currentFormatPart$ || 'HH'
        });
      }, 200);
    } else {
      this.windowPressEventListenerUnRegister();
      this.removeAllSelection();
      this.currentFormatPart$ = '';
      this.saveValue();
    }
  }
}
