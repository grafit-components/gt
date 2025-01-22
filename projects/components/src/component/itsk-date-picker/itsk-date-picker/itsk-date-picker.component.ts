import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import momentMini from 'moment-mini';
import { takeWhile } from 'rxjs/operators';
import { ItskAlign } from '../../../common/model/itsk-align.enum';
import { ArrayUtil } from '../../../util/array-util';
import { NumberUtil } from '../../../util/number-util';
import { ItskDatePeriod } from '../model/itsk-date-period';
import { ItskDatePickerMode } from '../model/itsk-date-picker-mode.enum';
import { ItskPickerLocaleModel } from '../model/itsk-picker-locale-model';
import { ItskRange } from '../model/itsk-range';
import { PickerLocaleService } from '../service/picker-locale.service';

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItskDatePickerComponent),
  multi: true,
};

@Component({
    selector: 'itsk-date-picker',
    templateUrl: './itsk-date-picker.component.html',
    styleUrls: ['./itsk-date-picker.component.scss'],
    providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ItskDatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @HostBinding('class.datepicker') classDatepicker = true;
  ItskDatePickerMode = ItskDatePickerMode;
  displayMode: ItskDatePickerMode = ItskDatePickerMode.Date;
  private alive = true;
  /** Показать иконку */
  @Input() showIcon = true;
  /** Показать кнопку очистки */
  @Input() showClear = true;
  /** Класс иконки (из библиотеки font-awesome) */
  @Input() icon = 'icon-calendar-date';
  /** Компонент неактивен */
  @Input() disabled: boolean = false;
  /** Первый день недели */
  @Input() firstDayOfWeek = 1;
  /** Даты, недоступные для выбора */
  @Input() disabledDates?: Date[];
  /** Периоды, недоступные для выбора */
  @Input() disabledPeriods?: ItskDatePeriod[];
  /** Дни недели, недоступные для выбора */
  @Input() disabledDays?: number[];
  /** Минимальная доступная дата */
  @Input() minDate?: Date;
  /** Максимальная доступная дата */
  @Input() maxDate?: Date;
  /** Минимальный доступный год в виде даты */
  @Input() minYearDate?: Date;
  /** Максимальный доступный год в виде даты */
  @Input() maxYearDate?: Date;
  /** Показывать выбор времени */
  @Input() showTime = false;
  /** Показывать выбор времени с секундами */
  @Input() showSeconds = false;
  /** Позволить значение null */
  @Input() allowNull = true;
  /** Значение по умолчанию, используется если инициируется как null и allowNull == false */
  @Input() defaultDate?: Date;
  /** Использовать position: fixes */
  @Input() fixed: boolean = false;
  /** Использовать align для ItskDropdownComponent */
  @Input() align: ItskAlign.Left | ItskAlign.Right = ItskAlign.Left;
  /** Введено недопустимое значение в поле */
  invalid = false;
  /** Введено пустое значение в поле */
  isEmpty = false;

  locale?: ItskPickerLocaleModel;
  showPicker: boolean = false;
  public today: Date = new Date();
  public formatValue: any = {
    DD: '__',
    MM: '__',
    YYYY: '____',
    HH: '__',
    mm: '__',
    ss: '__',
  };
  allowableRange: any = {
    DD: [1, 31],
    MM: [1, 12],
    YYYY: [1900, 2100],
    HH: [0, 23],
    mm: [0, 59],
    ss: [0, 59],
  };
  private valueManuallyChanged$: boolean = false;
  element?: HTMLElement;
  inputElement?: HTMLElement;
  ignoreFocus = false;
  isWindowPressEventListenerRegistered = false;
  /** Таймауат для window.resize */
  protected timeout: any;
  /** Активная часть контролла даты */
  currentFormatPart$: string = '';
  /** Активна часть контролла ввода времени */
  isTimePart$: boolean = false;
  /** Формат отображения даты */
  format$: string = '';
  formatList$: string[] = [];
  formatEssentialList$: string[] = [];

  get format(): string {
    return this.format$;
  }

  set format(value: string) {
    this.formatList$ = value.split(/\b/);
    this.formatEssentialList$ = this.formatList$.filter(this.isEditableFormat);
    this.format$ = value;
  }

  /** Текущая дата */
  value$: Date | null = null;

  get value(): Date | null {
    return this.value$;
  }

  set value(v: Date | null) {
    if (v?.getTime() !== this.value$?.getTime()) {
      this.value$ = v;
      this.onChange(v);
    }
  }

  /** Текущий час */
  currentHour$: number = 0;

  get currentHour(): number {
    return this.currentHour$;
  }

  set currentHour(v: number) {
    let newVal = v;
    if (v <= 0) {
      newVal = 0;
    }
    if (v > 23) {
      newVal = 23;
    }
    this.currentHour$ = newVal;
    this.formatValue.HH = this.formatTime(v);
  }

  /** Текущая минута */
  currentMinute$: number = 0;

  get currentMinute(): number {
    return this.currentMinute$;
  }

  set currentMinute(v: number) {
    let newVal = v;
    if (v <= 0) {
      newVal = 0;
    }
    if (v > 59) {
      newVal = 59;
    }
    this.currentMinute$ = newVal;
    this.formatValue.mm = this.formatTime(v);
  }

  /** Текущий день */
  currentDate$: number = 0;

  get currentDate(): number {
    return this.currentDate$;
  }

  set currentDate(v: number) {
    if (v < 0 || v > 31) {
      return;
    }
    if (v !== this.currentDate$) {
      this.currentDate$ = v;
      this.formatValue.DD = this.formatTime(v);
      this.checkDateValid();
    }
  }

  /** Текущий месяц */
  currentMonth$: number = 0;

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

  /** Текущий год */
  currentYear$: number = 0;

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

  constructor(
    public localeService: PickerLocaleService,
    private cdr$: ChangeDetectorRef,
    private elementRef$: ElementRef,
  ) {
    localeService.locale.pipe(takeWhile((_) => this.alive)).subscribe((locale: ItskPickerLocaleModel) => {
      this.locale = locale;
    });
    this.setDefaults();
  }

  writeValue(value: any) {
    if ((value === null || value === undefined || isNaN(value.getTime())) && !this.allowNull && this.defaultDate) {
      value = this.defaultDate;
      this.value$ = value;
      this.onChange(this.value$);
    } else {
      this.value$ = value;
    }
    this.initFormatValue();
    this.initPicker(value);
    this.cdr$.markForCheck();
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdr$.markForCheck();
  }

  ngOnInit() {
    this.element = this.elementRef$.nativeElement as HTMLElement;
    this.inputElement = this.elementRef$.nativeElement.querySelector('.datepicker__input') as HTMLElement;
    if (this.showTime) {
      this.format = this.showSeconds ? 'DD.MM.YYYY HH:mm:ss' : 'DD.MM.YYYY HH:mm';
    } else {
      this.format = 'DD.MM.YYYY';
    }
    this.initFormatValue();
    const [minRange, maxRange] = this.allowableRange.YYYY;
    this.minYearDate = new Date(minRange, 0, 1);
    this.maxYearDate = new Date(maxRange, 11, 31);
    if (!this.minDate || !(this.minDate instanceof Date)) {
      this.minDate = this.minYearDate;
    }
    if (!this.maxDate || !(this.maxDate instanceof Date)) {
      this.maxDate = this.maxYearDate;
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  setDefaults = () => {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    this.today = today;
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.currentHour = 0;
    this.currentMinute = 0;
  };

  initPicker = (date: Date | null) => {
    if (date === null || date === undefined || isNaN(date.getTime())) {
      this.setDefaults();
    } else {
      this.currentMonth = date.getMonth();
      this.currentYear = date.getFullYear();
      this.currentHour = date.getHours();
      this.currentMinute = date.getMinutes();
    }
  };

  setDate = (day: Date) => {
    this.currentDate = day.getDate();
    this.currentMonth = day.getMonth();
    this.currentYear = day.getFullYear();
    this.formatValue.MM = this.formatTime(this.currentMonth + 1);
    this.formatValue.YYYY = this.formatTime(this.currentYear, 4);
    this.checkDateValid();
    this.jumpToFormat({
      name: 'DD',
    });
    this.saveValue();
  };

  applyDate = (day: Date) => {
    this.setDate(day);
    this.closePicker();
  };

  checkUserDate = (val: string) => {
    if (this.valueManuallyChanged$ !== true) {
      return;
    }
    const parsedDate = this.parseMomentDate(val);
    if (parsedDate.isValid()) {
      this.value = parsedDate.toDate();
      this.writeValue(this.value);
    } else {
      if (this.allowNull) {
        this.value = null;
      } else {
        this.setInvalid();
        if (this.isEmpty) {
          this.initFormatMaskValue();
        } else {
          this.initFormatValue();
        }
      }
    }
    this.valueManuallyChanged$ = false;
  };

  private parseMomentDate = (val: string) => {
    const moment = momentMini;
    return moment(val, this.format);
  };

  private getInputDate = (): Date => {
    return new Date(+this.formatValue.YYYY, +this.formatValue.MM - 1, +this.formatValue.DD);
  };

  private isDateAutoCorrected = (date: Date, yearPart: number, monthPart: number, datePart: number): boolean => {
    return date.getFullYear() !== yearPart || date.getMonth() !== monthPart - 1 || date.getDate() !== datePart;
  };

  private checkFormatValueEmpty = (): void => {
    this.isEmpty = this.formatEssentialList$.every((_) => this.formatValue[_].split('').every((__: any) => __ === '_'));
  };

  private checkDateValid = (): void => {
    if (this.format === null || this.format === undefined) {
      return;
    }

    if (['YYYY', 'MM', 'DD'].some((_) => this.formatValue[_].indexOf('_') !== -1)) {
      this.unsetInvalid();
      return;
    }
    this.checkFormatValueEmpty();
    const getInputDate = this.getInputDate();
    const isDateInvalid =
      !this.isEmpty &&
      (this.isDateInvalid(getInputDate) ||
        this.isDateAutoCorrected(getInputDate, +this.formatValue.YYYY, +this.formatValue.MM, +this.formatValue.DD));
    if (isDateInvalid) {
      this.setInvalid(false);
    } else {
      this.unsetInvalid();
    }
  };

  private setInvalid = (isFlash: boolean = true): void => {
    this.invalid = true;
    if (isFlash) {
      window.setTimeout(this.unsetInvalid, 200);
    }
  };

  private unsetInvalid = (): void => {
    this.invalid = false;
  };

  private getPrevFormat = (currentFormat: string, format: string): ItskRange | null => {
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
      end: format.length - (exec.index + exec[0].length),
    };
  };

  private getNextFormat = (currentFormat: string, format: string): ItskRange | null => {
    const nextNameRegExp = /(\b)\w+(\b|$)/g;
    nextNameRegExp.lastIndex = format.indexOf(currentFormat) + currentFormat.length;
    const exec = nextNameRegExp.exec(format);
    if (!exec) {
      return null;
    }

    return {
      name: exec[0],
      start: exec.index,
      end: exec.index + exec[0].length,
    };
  };

  isEditableFormat = (value: string) => {
    return /\w+/.test(value);
  };

  getRangeNode = (formatName: string): Node | null => {
    this.inputElement = this.elementRef$.nativeElement.querySelector('.datepicker__input') as HTMLElement;
    return this.isTimePart$ && (formatName === 'HH' || formatName === 'mm')
      ? this.element?.querySelector(`.datepicker__time-input[data-format="${formatName}"]`) ?? null
      : this.inputElement.querySelector(`[data-format="${formatName}"]`);
  };

  jumpToFormat = (format: any): void => {
    const rangeNode = this.getRangeNode(format.name);
    if (rangeNode) {
      this.elementSelection(rangeNode);
    }
    this.currentFormatPart$ = format.name;
  };

  saveValue = () => {
    this.checkFormatValueEmpty();
    const getInputDate = this.getInputDate();
    const isDateInvalid =
      !this.isEmpty &&
      (this.isDateInvalid(getInputDate) ||
        this.isDateAutoCorrected(getInputDate, +this.formatValue.YYYY, +this.formatValue.MM, +this.formatValue.DD));
    if (isDateInvalid) {
      this.setInvalid(false);
    } else {
      this.unsetInvalid();
    }
    if (!isDateInvalid && !(this.isEmpty && !this.allowNull)) {
      this.valueManuallyChanged$ = true;
      this.checkUserDate(this.formatList$.map((_) => (this.isEditableFormat(_) ? this.formatValue[_] : _)).join(''));
    }
  };

  saveInput = (valueList: string[], format: string, transitionToNextFormat: boolean = true): void => {
    this.formatValue[format] = valueList.join('');
    window.setTimeout(this.checkDateValid, 0);
    if (valueList.every((_) => NumberUtil.isNumeric(+_))) {
      if (format === 'YYYY') {
        this.currentYear = +this.formatValue[format];
      }
      if (format === 'MM') {
        this.currentMonth = +this.formatValue[format] - 1;
      }
      if (format === 'DD') {
        this.currentDate = +this.formatValue[format];
      }
      if (transitionToNextFormat) {
        this.goToNextFormat(format);
      }
    }
    this.cdr$.markForCheck();
  };

  appendToFormat = (format: string, x: number): void => {
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
  };

  goToPrevFormat = (format: string): void => {
    const prevFormat = this.getPrevFormat(format, this.format);
    if (prevFormat) {
      this.jumpToFormat(prevFormat);
    }
  };

  goToNextFormat = (format: string): void => {
    const nextFormat = this.getNextFormat(format, this.format);
    if (nextFormat) {
      this.jumpToFormat(nextFormat);
    }
  };

  ignoreInput = () => {
    this.setInvalid();
  };

  onWindowPress = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }
    const allowableRange = this.allowableRange[this.currentFormatPart$];
    let valueList = this.formatValue[this.currentFormatPart$].split('');

    const key = event.key || event.keyCode;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.unsetInvalid();
      this.checkFormatValueEmpty();
      this.initFormatValue(this.value);
      this.closePicker();
    }

    if (
      this.isScrollIgnored() &&
      (key === 'ArrowLeft' ||
        key === 'left' ||
        key === 37 ||
        key === 'ArrowUp' ||
        key === 'Up' ||
        key === 38 ||
        key === 'ArrowRight' ||
        key === 'right' ||
        key === 39 ||
        key === 'ArrowDown' ||
        key === 'Down' ||
        key === 40 ||
        key === 'Enter' ||
        key === 13 ||
        key === 'Backspace' ||
        key === 8 ||
        key === 'Delete' ||
        key === 'Del' ||
        key === 46)
    ) {
      return;
    }

    if (
      key === 'Backspace' ||
      key === 8 ||
      key === 'ArrowLeft' ||
      key === 'left' ||
      key === 37 ||
      key === 'ArrowUp' ||
      key === 'Up' ||
      key === 38 ||
      key === 'ArrowRight' ||
      key === 'right' ||
      key === 39 ||
      key === 'ArrowDown' ||
      key === 'Down' ||
      key === 40
    ) {
      event.preventDefault();
    }

    if (key === 'Enter' || key === 13) {
      this.closePicker();
    }

    if (key === 'Tab' || key === 9) {
      this.closePicker();
    }

    if (key === 'ArrowLeft' || key === 'left' || key === 37) {
      if (!(this.isTimePart$ && this.currentFormatPart$ === 'HH')) {
        this.goToPrevFormat(this.currentFormatPart$);
      }
    }

    if (key === 'ArrowUp' || key === 'Up' || key === 38) {
      this.appendToFormat(this.currentFormatPart$, 1);
      return;
    }

    if (key === 'ArrowDown' || key === 'Down' || key === 40) {
      this.appendToFormat(this.currentFormatPart$, -1);
      return;
    }

    if (key === 'ArrowRight' || key === 'right' || key === 39 || key === ',' || key === 188 || key === '.' || key === 190) {
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

    if (key === 'Backspace' || key === 8 || key === 'Delete' || key === 'Del' || key === 46) {
      if (valueList.every((_: any) => _ === '_')) {
        if (this.currentFormatPart$ === 'HH') {
          this.isTimePart$ = false;
        }
        this.goToPrevFormat(this.currentFormatPart$);
      } else {
        valueList = valueList.map(() => '_');
        this.saveInput(valueList, this.currentFormatPart$);
        this.jumpToFormat({
          name: this.currentFormatPart$,
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
        console.log('saveInput');
        this.saveInput(valueList, this.currentFormatPart$);
      } else {
        console.log('ignoreInput');
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
    this.checkFormatValueEmpty();
  };

  windowPressEventListenerRegister = (): void => {
    document.addEventListener('keydown', this.onWindowPress, false);
    this.isWindowPressEventListenerRegistered = true;
  };

  windowPressEventListenerUnRegister = (): void => {
    document.removeEventListener('keydown', this.onWindowPress, false);
    this.isWindowPressEventListenerRegistered = false;
  };

  removeAllSelection = (): void => {
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
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
    this.elementSelection(e.target);
    if (this.currentFormatPart$ !== format) {
      this.currentFormatPart$ = format;
    }
    this.isTimePart$ = e.target.classList.contains('datepicker__time-input');
    if (!this.showPicker) {
      this.openPicker(true);
    }
  };

  dataPartScroll = (e: any, format: string): void => {
    if (!this.showPicker || this.isScrollIgnored()) {
      return;
    }
    e.preventDefault();
    const currentIsTimePart = this.isTimePart$ ? e.target.classList.contains('datepicker__time-input') : false;
    if (this.currentFormatPart$ !== format || this.isTimePart$ !== currentIsTimePart) {
      this.isTimePart$ = currentIsTimePart;
      this.jumpToFormat({
        name: format,
      });
    }
    this.appendToFormat(format, e.deltaY > 0 ? 1 : -1);
  };

  dataInputDoubleClick = (e: any): void => {
    e.preventDefault();
    e.stopPropagation();
    if (this.inputElement) this.elementSelection(this.inputElement);
    this.currentFormatPart$ = 'YYYY';
  };

  private isBelong = (valueList: string[], band: number[]): boolean => {
    const [minRange, maxRange] = band;
    const capacity = maxRange.toString().length;
    if (valueList.length !== capacity) {
      throw new Error("Can't identity belong of value to range");
    }
    const rangeList = ArrayUtil.getSequence(minRange, maxRange);
    const capacityList = ArrayUtil.getSequence(1, capacity);

    if (valueList.every((_) => NumberUtil.isNumeric(+_))) {
      const value = +valueList.join('');
      return rangeList.indexOf(value) !== -1;
    }

    return rangeList.some((_) => {
      return capacityList.every((digit) => {
        const valueIndex = capacity - digit;
        // tslint:disable-next-line:no-bitwise
        return isNaN(+valueList[valueIndex]) || +valueList[valueIndex] === ((_ / Math.pow(10, digit - 1)) % 10 | 0);
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
        mm: this.formatTime(value.getMinutes()),
        ss: this.formatTime(value.getSeconds()),
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

  clearPicker = (): void => {
    if (!this.showClear || !this.allowNull) {
      return;
    }
    this.unsetInvalid();
    this.value = null;
    this.initFormatMaskValue();
    this.jumpToFormat({
      name: 'DD',
    });
  };

  isDateInvalid = (dat: Date): boolean => {
    return (
      this.isDayDisabled(dat) ||
      this.isDateDisabled(dat) ||
      this.isDateInDisabledPeriod(dat) ||
      this.isMaxInvalid(dat) ||
      this.isMinInvalid(dat)
    );
  };

  isDayDisabled = (dat: Date): boolean => {
    if (!this.disabledDays || this.disabledDays.length < 1 || !dat) {
      return false;
    }
    return this.disabledDays.indexOf(dat.getDay()) >= 0;
  };

  isDateDisabled = (dat: Date): boolean => {
    if (!this.disabledDates || this.disabledDates.length < 1 || !dat) {
      return false;
    }
    return this.disabledDates.some(
      (d: Date) => d && d.getFullYear() === dat.getFullYear() && d.getMonth() === dat.getMonth() && d.getDate() === dat.getDate(),
    );
  };

  isMinInvalid = (dat: Date): boolean => {
    if (!this.minDate || !(this.minDate instanceof Date) || !dat) {
      return false;
    }
    return this.minDate.getTime() > dat.getTime();
  };

  isMaxInvalid = (dat: Date): boolean => {
    if (!this.maxDate || !(this.maxDate instanceof Date) || !dat) {
      return false;
    }
    return this.maxDate.getTime() < dat.getTime();
  };

  isDateInDisabledPeriod = (dat: Date): boolean => {
    if (!this.disabledPeriods || this.disabledPeriods.length < 1 || !dat) {
      return false;
    }
    return this.disabledPeriods.some(
      (d: ItskDatePeriod) => d && d.start && d.end && d.start.getTime() <= dat.getTime() && d.end.getTime() >= dat.getTime(),
    );
  };

  isScrollIgnored = (): boolean => {
    return this.displayMode === ItskDatePickerMode.Month || this.displayMode === ItskDatePickerMode.Year;
  };

  scrollMonth = (e: any) => {
    this.preventEvent(e);
    if (this.isScrollIgnored()) {
      return false;
    }
    const [minRange, maxRange] = this.allowableRange.MM;
    if (e.deltaY > 0) {
      if (this.currentMonth === maxRange - 1) {
        this.currentMonth = minRange - 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    } else {
      if (this.currentMonth === minRange - 1) {
        this.currentMonth = maxRange - 1;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
    this.jumpToFormat({
      name: 'MM',
    });
    return true;
  };

  scrollYear = (e: any) => {
    this.preventEvent(e);
    if (this.isScrollIgnored()) {
      return false;
    }
    if (e.deltaY > 0) {
      this.currentYear++;
    } else {
      this.currentYear--;
    }
    this.jumpToFormat({
      name: 'YYYY',
    });
    return true;
  };

  dataInputFocus = (e: FocusEvent) => {
    if (!this.showPicker && !this.ignoreFocus) {
      this.openPicker(true, e);
    }
  };

  dataInputScroll = (e: any): void => {
    if (!this.showPicker) {
      return;
    }
    e.preventDefault();
  };

  openPicker = (show: boolean, e: any = null) => {
    if (this.disabled) {
      return;
    }
    if (show) {
      if (!this.invalid) {
        this.initPicker(this.value);
      }
      if (!this.isWindowPressEventListenerRegistered) {
        this.windowPressEventListenerRegister();
      }
      if (!this.currentFormatPart$) {
        this.currentFormatPart$ = 'DD';
      }
      if (e) {
        window.setTimeout(() => {
          this.jumpToFormat({
            name: 'DD',
          });
        }, 50);
      }
    } else {
      this.windowPressEventListenerUnRegister();
      this.saveValue();
      this.setMode(ItskDatePickerMode.Date);
      window.setTimeout(() => {
        this.ignoreFocus = false;
      }, 50);
      this.ignoreFocus = true;
    }
    if (!(this.isEmpty && !this.allowNull)) {
      this.initFormatValue();
    }
    this.showPicker = show;
    this.onTouched();
    this.cdr$.markForCheck();
  };

  closePicker = () => {
    this.openPicker(false);
    this.removeAllSelection();
  };

  preventEvent = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  setMonth = (month: number) => {
    this.currentMonth = month;
    this.setMode(ItskDatePickerMode.Date);
    this.jumpToFormat({
      name: 'MM',
    });
  };

  setYear = (year: number) => {
    this.currentYear = year;
    this.setMode(ItskDatePickerMode.Date);
    this.jumpToFormat({
      name: 'YYYY',
    });
  };

  setToday = () => {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.initFormatValue(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        +this.formatValue.HH || this.currentHour,
        +this.formatValue.mm || this.currentMinute,
        0,
      ),
    );
    this.checkDateValid();
  };

  applyToday = (e: any) => {
    this.preventEvent(e);
    if (!this.invalid) {
      this.closePicker();
    }
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

  setMode(mode: ItskDatePickerMode) {
    let result: ItskDatePickerMode;
    if (mode === this.displayMode || mode === ItskDatePickerMode.Date) {
      result = ItskDatePickerMode.Date;
    } else {
      result = mode;
    }
    this.displayMode = result;
  }
}
