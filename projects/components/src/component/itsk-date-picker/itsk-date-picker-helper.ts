import {ItskPickerDayModel} from './model/itsk-picker-day-model';
import {ItskDatePeriod} from './model/itsk-date-period';

export class ItskDatePickerHelper {
  static getFirstDay(month: number, year: number, firstDayOfWeek: number): Date {
    const lastDay = new Date(year, month, 0);
    const lastDayIndex = lastDay.getDay() >= firstDayOfWeek
      ? lastDay.getDay() - firstDayOfWeek
      : lastDay.getDay() + 7 - firstDayOfWeek;
    return new Date(year, month - 1, lastDay.getDate() - lastDayIndex);
  }

  static getPickerDays(
    year: number,
    month: number,
    date: number,
    firstDayOfWeek: number,
    minDate: Date,
    maxDate: Date,
    disabledDates: Date[],
    disabledDays: number[],
    disabledPeriods: ItskDatePeriod[]
  ): ItskPickerDayModel[] {
    const days = [];
    const firstDay = ItskDatePickerHelper.getFirstDay(month, year, firstDayOfWeek);
    for (let i = 0; i < 6 * 7; i++) {
      const dat = new Date(firstDay);
      dat.setDate(dat.getDate() + i);
      days.push(new ItskPickerDayModel({
        date: dat,
        disabled: ItskDatePickerHelper.isDateInvalid(dat, minDate, maxDate, disabledDates, disabledDays, disabledPeriods),
        today: ItskDatePickerHelper.isToday(dat),
        isCurrentMonth: dat.getMonth() === month,
        selected: dat.getFullYear() === year && dat.getMonth() === month && dat.getDate() === date,
        weekend: dat.getDay() === 0 || dat.getDay() === 6
      }));
    }
    return days;
  }


  static isDateInvalid(dat: Date,
                       minDate: Date,
                       maxDate: Date,
                       disabledDates: Date[],
                       disabledDays: number[],
                       disabledPeriods: ItskDatePeriod[]): boolean {
    return ItskDatePickerHelper.isDayDisabled(dat, disabledDays)
      || ItskDatePickerHelper.isDateDisabled(dat, disabledDates)
      || ItskDatePickerHelper.isDateInDisabledPeriod(dat, disabledPeriods)
      || ItskDatePickerHelper.isMaxInvalid(dat, maxDate)
      || ItskDatePickerHelper.isMinInvalid(dat, minDate);
  }

  static isDayDisabled(dat: Date, disabledDays: number[]): boolean {
    if (dat === null || dat === undefined || disabledDays === null || disabledDays === undefined || disabledDays.length < 1) {
      return false;
    }
    return disabledDays.indexOf(dat.getDay()) >= 0;
  }

  static isMinInvalid(dat: Date, minDate: Date): boolean {
    if (dat === null || dat === undefined || minDate === null || minDate === undefined) {
      return false;
    }
    return minDate.getTime() > dat.getTime();
  }

  static isMaxInvalid(dat: Date, maxDate: Date): boolean {
    if (dat === null || dat === undefined || maxDate === null || maxDate === undefined) {
      return false;
    }
    return maxDate.getTime() < dat.getTime();
  }

  static isDateInDisabledPeriod(dat: Date, disabledPeriods: ItskDatePeriod[]): boolean {
    if (dat === null || dat === undefined || disabledPeriods === null || disabledPeriods === undefined || disabledPeriods.length < 1) {
      return false;
    }
    return disabledPeriods.some((d: ItskDatePeriod) => (
        d !== null
        && d !== undefined
        && d.start !== null
        && d.start !== undefined
        && d.end !== null
        && d.end !== undefined
        && d.start.getTime() <= dat.getTime()
        && d.end.getTime() >= dat.getTime()
      )
    );
  }

  static isDateDisabled(dat: Date, disabledDates: Date[]): boolean {
    if (disabledDates === null || disabledDates === undefined || disabledDates.length < 1 || dat === null || dat === undefined) {
      return false;
    }
    return disabledDates.some((d: Date) => (
        d !== null
        && d !== undefined
        && d.getFullYear() === dat.getFullYear()
        && d.getMonth() === dat.getMonth()
        && d.getDate() === dat.getDate()
      )
    );
  }

  static isToday(dat: Date): boolean {
    if (dat === null || dat === undefined) {
      return false;
    }
    const today = new Date();
    return dat.getFullYear() === today.getFullYear()
      && dat.getMonth() === today.getMonth()
      && dat.getDate() === today.getDate();
  }

  static isSelected(date: Date, selectedDate: Date): boolean {
    if (date === null || date === undefined || selectedDate === null || selectedDate === undefined) {
      return false;
    }
    return date.getFullYear() === selectedDate.getFullYear()
      && date.getMonth() === selectedDate.getMonth()
      && date.getDate() === selectedDate.getDate();
  }


  static sliceArrayIntoGroups<T>(arr: T[], size: number): T[][] {
    let step = 0;
    const sliceArr = [];
    const len = arr.length;
    while (step < len) {
      sliceArr.push(arr.slice(step, step += size));
    }
    return sliceArr;
  }

  static nextMonth(date: Date): Date {
    const dt = new Date(date);
    dt.setMonth(dt.getMonth() + 1);
    return dt;
  }

  static prevMonth(date: Date): Date {
    const dt = new Date(date);
    dt.setMonth(dt.getMonth() - 1);
    return dt;
  }
}
