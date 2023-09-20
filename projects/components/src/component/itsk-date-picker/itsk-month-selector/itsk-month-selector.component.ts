import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItskPickerLocaleModel} from '../model/itsk-picker-locale-model';

@Component({
  selector: 'itsk-month-selector',
  templateUrl: './itsk-month-selector.component.html',
  styleUrls: ['./itsk-month-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItskMonthSelectorComponent implements OnInit {
  currentMonth$: number;

  @Input()
  set currentMonth(val: number) {
    this.currentMonth$ = val;
    this.makeMonths();
  }

  get currentMonth(): number {
    return this.currentMonth$;
  }

  currentYear$: number;

  @Input()
  set currentYear(val: number) {
    this.currentYear$ = val;
  }

  get currentYear(): number {
    return this.currentYear$;
  }

  @Input() locale: ItskPickerLocaleModel;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Output() monthSelected = new EventEmitter<number>();
  @Output() monthApplied = new EventEmitter<number>();
  today: Date;
  months: number[] = [];
  shift = 0;

  private get _displayDate(): Date {
    let month = 0;
    let year = 0;
    if (this.currentMonth !== null && this.currentMonth !== undefined && this.currentMonth >= 0 && this.currentMonth <= 11) {
      month = this.currentMonth;
    }
    if (this.currentYear !== null && this.currentYear !== undefined) {
      year = this.currentYear;
    }
    return new Date(year, month, 1);
  }

  constructor() {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
  }

  private makeMonths() {
    const start = this._displayDate;
    this.months = [];
    start.setMonth((start.getMonth() - 3));
    for (let i = this.shift; i < 7 + this.shift; i++) {
      const dt = new Date(start.getFullYear(), start.getMonth() + i, 1);
      this.months.push(dt.getMonth());
    }
  }

  ngOnInit() {
  }

  scrollMonthSelector = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const step = e.deltaY > 0 ? 1 : -1;
    this.shiftMonthSelector(step);
  };

  shiftMonthSelector = (step: number = 0) => {
    this.shift += step;
    this.makeMonths();
  };

  setMonth = (e: any, month: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isMonthDisabled(month)) {
      this.shift = 0;
      this.monthSelected.emit(month);
    }
  };

  applyMonth = (e: any, month: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isMonthDisabled(month)) {
      this.monthApplied.emit(month);
    }
  };

  isMonthDisabled = (month: number) => {
    if (!month && !this.currentYear) {
      const dat = new Date(this.currentYear, month, 1);
      return this.isMaxInvalid(dat) || this.isMinInvalid(dat);
    }
    return false;
  };

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

  leadingZero = (value: number): string => {
    return ((value < 10) ? '0' : '') + value;
  };
}
