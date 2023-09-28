import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ItskPickerLocaleModel} from '../model/itsk-picker-locale-model';
import {PickerLocaleService} from '../service/picker-locale.service';
import {takeWhile} from 'rxjs/operators';
import {ItskDatePickerMode} from '../model/itsk-date-picker-mode.enum';

export const MONTH_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ItskMonthPickerComponent),
  multi: true
};

@Component({
  selector: 'itsk-month-picker',
  templateUrl: './itsk-month-picker.component.html',
  styleUrls: ['./itsk-month-picker.component.scss'],
  providers: [MONTH_PICKER_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskMonthPickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  ItskDatePickerMode = ItskDatePickerMode;
  subs = true;
  open: boolean = false;
  /**
   * показать иконку
   */
  @Input() showIcon = true;
  /**
   * показать кнопку очистки
   */
  @Input() showClear = true;
  /**
   * класс иконки (из библиотеки font-awesome)
   */
  @Input() icon = 'icon-calendar_16';
  /**
   * css класс, который будет применен к input
   */
  @Input() className: string[] = [];
  /**
   * компонент неактивен
   */
  @Input() disabled: boolean = false;
  /**
   * Минимальная доступная дата
   */
  @Input() minDate?: Date;
  /**
   * Максимальная доступная дата
   */
  @Input() maxDate?: Date;
  /**
   * Показывать конпку выбора "сегодня"
   */
  @Input() showToday = true;
  /**
   * Использовать position: fixes
   */
  @Input() fixed = true;

  locale?: ItskPickerLocaleModel;
  // showPicker: boolean;
  public today: Date = new Date();

  displayMode: ItskDatePickerMode = ItskDatePickerMode.Month;

  /**
   * Текущая дата
   */
  value$: Date | null = null;

  get value(): any {
    return this.value$;
  }

  set value(v: any) {
    if (v !== this.value$) {
      this.value$ = v;
      this.onChange(v);
    }
  }

  /**
   * Текущий месяц
   */
  currentMonth$: number | null = null;

  get currentMonth(): number | null {
    return this.currentMonth$;
  }

  set currentMonth(v: number | null) {
    if (v === null || v === undefined || v < 0 || v > 11) {
      return;
    }
    if (v !== this.currentMonth$) {
      this.currentMonth$ = v;
    }
  }

  /**
   * Текущий год
   */
  currentYear$: number | null = null;

  get currentYear(): number | null {
    return this.currentYear$;
  }

  set currentYear(v: number | null) {
    if (v !== this.currentYear$) {
      this.currentYear$ = v;
    }
  }

  constructor(public localeService: PickerLocaleService,
              private cdr$: ChangeDetectorRef) {
    localeService.locale
      .pipe(takeWhile(_ => this.subs))
      .subscribe((locale: ItskPickerLocaleModel) => {
        this.locale = locale;
      });
    this.setDefaults();
  }

  writeValue(value: any) {
    this.value$ = value;
    this.initPicker(value);
  }

  initPicker(date: Date) {
    if (!date || !(date instanceof Date)) {
      this.setDefaults();
    } else {
      this.currentMonth = date.getMonth();
      this.currentYear = date.getFullYear();
    }
    this.cdr$.markForCheck();
  }

  setDefaults() {
    this.today = new Date();
    this.currentMonth = null;
    this.currentYear = null;
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
    if (!this.minDate || !(this.minDate instanceof Date)) {
      this.minDate = new Date('1900-01-01T00:00:00Z');
    }
    if (!this.maxDate || !(this.maxDate instanceof Date)) {
      this.maxDate = new Date('2100-12-31T00:00:00Z');
    }
    this.initPicker(this.value);
  }

  ngOnDestroy() {
    this.subs = false;
  }

  isMinInvalid = (dat: Date): boolean => {
    if (!this.minDate || !(this.minDate instanceof Date) || !dat) {
      return false;
    }
    const min = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1);
    return min.getTime() > dat.getTime();
  };

  isMaxInvalid = (dat: Date): boolean => {
    if (!this.maxDate || !(this.maxDate instanceof Date) || !dat) {
      return false;
    }
    const max = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1);
    return max.getTime() < dat.getTime();
  };

  scrollMonth = (e: any) => {
    if (this.open) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (!this.value$) {
      return;
    }
    if (this.currentYear === null || this.currentYear === undefined) {
      this.currentYear = this.today.getFullYear();
    }
    if (this.currentMonth === null || this.currentMonth === undefined) {
      this.currentMonth = this.today.getMonth();
    }
    if (e.deltaY > 0) {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    } else {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  scrollYear = (e: any) => {
    if (this.open) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (!this.value$) {
      return;
    }
    if (!this.currentYear) {
      this.currentYear = this.today.getFullYear();
    }
    if (!this.currentMonth) {
      this.currentMonth = this.today.getMonth();
    }
    if (e.deltaY > 0) {
      this.currentYear++;
    } else {
      this.currentYear--;
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  setMonth = (month: number) => {
    this.currentMonth = month;
    if (!this.currentYear) {
      this.currentYear = this.today.getFullYear();
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  setYear = (year: number) => {
    this.currentYear = year;
    if (!this.currentMonth) {
      this.currentMonth = this.today.getMonth();
    }
    const newDate = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    if (!this.isMinInvalid(newDate) && !this.isMaxInvalid(newDate)) {
      this.value = newDate;
    }
  };

  setToday = () => {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.value = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
    this.open = false;
  };

  setMode(mode: ItskDatePickerMode) {
    let result: ItskDatePickerMode;
    if (mode === this.displayMode || mode === ItskDatePickerMode.Month) {
      result = ItskDatePickerMode.Month;
    } else {
      result = mode;
    }
    this.displayMode = result;
  }
}
