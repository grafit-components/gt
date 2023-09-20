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

export const DATE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItskDateInputComponent),
  multi: true
};

@Component({
  selector: 'itsk-date-input',
  templateUrl: './itsk-date-input.component.html',
  styleUrls: ['./itsk-date-input.component.scss'],
  providers: [DATE_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ItskDateInputComponent implements OnInit, ControlValueAccessor {
  /**
   * компонент неактивен
   */
  @Input() disabled: boolean;
  /**
   * Показывать выбор времени
   */
  @Input() showTime = false;
  /**
   * Разрешено пустое значение
   */
  @Input() allowNull: boolean;
  /**
   * Минимальный год
   */
  minYear$: number;

  @Input()
  set minYear(value: number) {
    this.minYear$ = value;
  }

  get minYear(): number {
    const [min, max] = this.allowableRange.YYYY;
    return this.minYear$ !== null && this.minYear$ !== undefined ? this.minYear$ : min;
  }


  /**
   * Максимальный год
   */
  maxYear$: number;

  @Input()
  set maxYear(value: number) {
    this.maxYear$ = value;
  }

  get maxYear(): number {
    const [min, max] = this.allowableRange.YYYY;
    return this.maxYear$ !== null && this.maxYear$ !== undefined ? this.maxYear$ : max;
  }

  get showFormat(): boolean {
    return (this.value$ !== null && this.value$ !== undefined) || this.active || !this.isEmpty;
  }

  active: boolean;
  borderless: boolean;

  public formatValue: any = {
    DD: '__',
    MM: '__',
    YYYY: '____',
    HH: '__',
    mm: '__'
  };
  allowableRange: any = {
    DD: [1, 31],
    MM: [1, 12],
    YYYY: [1900, 2100],
    HH: [0, 23],
    mm: [0, 59],
  };
  private valueManuallyChanged$: boolean;
  element: HTMLElement;
  inputElement: HTMLElement;
  isWindowPressEventListenerRegistered = false;
  /**
   * активная часть контролла даты
   */
  currentFormatPart$: string;
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
    const [minRange, maxRange] = this.allowableRange.YYYY;
    if (v < minRange || v > maxRange) {
      return;
    }
    if (v !== this.currentYear$) {
      this.currentYear$ = v;
      this.formatValue.YYYY = this.formatTime(v, 4);
      this.checkDateValid();
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
      this.formatValue.MM = this.formatTime(v + 1);
      this.checkDateValid();
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
    this.checkDateValid();
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
    this.checkDateValid();
  }


  get isEmpty(): boolean {
    return this.formatEssentialList$.every((_: any) => this.formatValue[_].split('').every((__: any) => __ === '_'));
  }

  invalid: boolean;

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
    if (this.showTime) {
      this.format = 'DD.MM.YYYY HH:mm';
    } else {
      this.format = 'DD.MM.YYYY';
    }
    this.initFormatValue();
    // const [minRange, maxRange] = this.allowableRange.YYYY;
    // this.minYearDate = new Date(minRange, 0, 1);
    // this.maxYearDate = new Date(maxRange, 11, 31);
    // if (isNullOrUndefined(this.minDate) || !(this.minDate instanceof Date)) {
    //   this.minDate = this.minYearDate;
    // }
    // if (isNullOrUndefined(this.maxDate) || !(this.maxDate instanceof Date)) {
    //   this.maxDate = this.maxYearDate;
    // }
  }

  setDefaults() {
    const today = new Date();
    // this.today = today;
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    // this.currentHour = 0;
    // this.currentMinute = 0;
  }

  initPicker(date: Date) {
    if (date === null || date === undefined || !(date instanceof Date) || isNaN(date.getTime())) {
      this.setDefaults();
    } else {
      this.currentMonth = date.getMonth();
      this.currentYear = date.getFullYear();
      this.currentHour = date.getHours();
      this.currentMinute = date.getMinutes();
    }
  }

  private getInputDate(): Date {
    return new Date(+this.formatValue.YYYY, +this.formatValue.MM - 1, +this.formatValue.DD);
  }

  private isDateAutoCorrected(date: Date, yearPart: number, monthPart: number, datePart: number): boolean {
    return date.getFullYear() !== yearPart || date.getMonth() !== (monthPart - 1) || date.getDate() !== datePart;
  }

  private checkDateValid(): void {
    if (this.format === null || this.format === undefined) {
      return;
    }

    if (['YYYY', 'MM', 'DD'].some(_ => (this.formatValue[_].indexOf('_') !== -1))) {
      this.unsetInvalid();
      return;
    }
    const getInputDate = this.getInputDate();
    const isDateInvalid = !this.isEmpty && (
      // this.isDateInvalid(getInputDate) ||
      this.isDateAutoCorrected(getInputDate, +this.formatValue.YYYY, +this.formatValue.MM, +this.formatValue.DD));
    if (isDateInvalid) {
      this.setInvalid(false);
    } else {
      this.unsetInvalid();
    }
  }


  private setInvalid(isFlash: boolean = true): void {
    this.invalid = true;
    if (isFlash) {
      window.setTimeout(this.unsetInvalid, 200);
    }
  }

  private unsetInvalid(): void {
    this.invalid = false;
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
    const getInputDate = this.getInputDate();
    const isDateInvalid = !this.isEmpty && (
      // this.isDateInvalid(getInputDate) ||
      this.isDateAutoCorrected(getInputDate, +this.formatValue.YYYY, +this.formatValue.MM, +this.formatValue.DD));
    if (isDateInvalid) {
      this.setInvalid(false);
    } else {
      this.unsetInvalid();
    }
    if (!isDateInvalid && !(this.isEmpty && !this.allowNull)) {
      this.valueManuallyChanged$ = true;
      const dateStr = this.formatList$.map(_ => (this.isEditableFormat(_) ? this.formatValue[_] : _)).join('');
    }
  }

  saveInput(valueList: string[], format: string, transitionToNextFormat: boolean = true): void {
    this.formatValue[format] = valueList.join('');
    window.setTimeout(this.checkDateValid, 0);
    if (valueList.every(_ => NumberUtil.isNumeric(+_))) {
      if (format === 'YYYY') {
        this.currentYear = +this.formatValue[format];
      }
      if (format === 'MM') {
        this.currentMonth = +this.formatValue[format] - 1;
      }
      if (format === 'DD') {
        // this.createDays(this.currentMonth, this.currentYear);
      }
      if (transitionToNextFormat) {
        this.goToNextFormat(format);
      }
    }
  }

  appendToFormat(format: string, x: number): void {
    const [minRange, maxRange] = this.allowableRange[this.currentFormatPart$];
    let newValue = (+this.formatValue[format] || (format === 'YYYY' ? this.currentYear : 0)) + x;
    if (newValue < minRange) {
      newValue = maxRange;
    }
    if (newValue > maxRange) {
      newValue = minRange;
    }
    const valueList = this.formatTime(newValue, format === 'YYYY' ? 4 : 2).split('');
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

  ignoreInput() {
    this.setInvalid();
  }

  onWindowPress = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    const allowableRange = this.allowableRange[this.currentFormatPart$];
    let valueList = this.formatValue[this.currentFormatPart$].split('');

    const key = event.key || event.keyCode;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.unsetInvalid();
      this.activate(false);
      this.initFormatValue(this.value);
    }

    if (
      key === 'Backspace' || key === 8 ||
      key === 'ArrowLeft' || key === 'left' || key === 37 ||
      key === 'ArrowUp' || key === 'Up' || key === 38 ||
      key === 'ArrowRight' || key === 'right' || key === 39 ||
      key === 'ArrowDown' || key === 'Down' || key === 40) {
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
          } else {
            this.ignoreInput();
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
      } else {
        this.ignoreInput();
      }
    } else if (this.isBelong(valueList, allowableRange)) {
      this.saveInput(valueList, this.currentFormatPart$);
    } else {
      valueList.unshift('0');
      valueList = valueList.slice(0, this.currentFormatPart$.length);
      if (this.isBelong(valueList, allowableRange)) {
        this.saveInput(valueList, this.currentFormatPart$);
      } else {
        this.ignoreInput();
      }
    }
    this.cdr$.detectChanges();
  };

  private saveOrClear() {

  }


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

  dataPartDown = (e: any, format: string): void => {
    e.preventDefault();
    e.stopPropagation();
    this.elementSelection(e.target);
    if (this.currentFormatPart$ !== format) {
      this.currentFormatPart$ = format;
    }
  };

  dataPartScroll = (e: any, format: string): void => {
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
    this.currentFormatPart$ = 'YYYY';
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
    if (this.invalid && !value) {
      return;
    }
    value = value || this.value;
    if (value) {
      this.formatValue = {
        DD: this.formatTime(value.getDate()),
        MM: this.formatTime(value.getMonth() + 1),
        YYYY: this.formatTime(value.getFullYear(), 4),
        HH: this.formatTime(value.getHours()),
        mm: this.formatTime(value.getMinutes())
      };
    } else {
      this.formatValue = this.formatEssentialList$.reduce((sum: any, current) => {
        sum[current] = '_'.repeat(current.length);
        return sum;
      }, {});
    }
  };

  initFormatMaskValue = (): void => {
    if (this.invalid) {
      return;
    }
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
    if (this.active === value) {
      return;
    }
    this.active = value;
    if (this.active) {
      this.windowPressEventListenerRegister();
      window.setTimeout(() => {
        this.jumpToFormat({
          name: 'DD'
        });
      }, 50);
    } else {
      this.windowPressEventListenerUnRegister();
      this.removeAllSelection();
      this.saveValue();
    }
  }
}
