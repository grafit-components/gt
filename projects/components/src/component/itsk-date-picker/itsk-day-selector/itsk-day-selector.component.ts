import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ItskDatePickerHelper } from '../itsk-date-picker-helper';
import { ItskDatePeriod } from '../model/itsk-date-period';
import { ItskPickerDayModel } from '../model/itsk-picker-day-model';
import { ItskPickerLocaleModel } from '../model/itsk-picker-locale-model';
import { PickerLocaleService } from '../service/picker-locale.service';

@Component({
  selector: 'itsk-day-selector',
  templateUrl: './itsk-day-selector.component.html',
  styleUrls: ['./itsk-day-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItskDaySelectorComponent implements OnInit, OnDestroy {
  protected stop: Subject<boolean> = new Subject<boolean>();
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

  @Output() dateSelected = new EventEmitter<Date>();

  @Output() monthSelected = new EventEmitter<number>();

  @Output() yearSelected = new EventEmitter<number>();

  @Output() applyDate: EventEmitter<Date> = new EventEmitter();

  locale?: ItskPickerLocaleModel;

  /** Текущая дата */
  currentDate$: number = 0;

  @Input()
  set currentDate(val: number) {
    this.currentDate$ = val;
    this.checkDays();
  }

  get currentDate(): number {
    return this.currentDate$;
  }

  /** Текущий месяц */
  currentMonth$: number = 0;

  @Input()
  set currentMonth(val: number) {
    this.currentMonth$ = val;
    this.createDays();
  }

  get currentMonth(): number {
    return this.currentMonth$;
  }

  /** Текущий год */
  currentYear$: number = 0;

  @Input()
  set currentYear(val: number) {
    this.currentYear$ = val;
    this.createDays();
  }

  get currentYear(): number {
    return this.currentYear$;
  }

  weeks?: Array<Array<ItskPickerDayModel>>;
  weekDays: number[] = [];

  constructor(
    public localeService: PickerLocaleService,
    private cdr$: ChangeDetectorRef,
  ) {
    localeService.locale.pipe(takeUntil(this.stop)).subscribe((locale: ItskPickerLocaleModel) => {
      this.locale = locale;
    });
  }

  ngOnInit() {
    this.weekDays = this.createWeekDays();
    this.createDays();
  }

  ngOnDestroy() {
    this.stop.next(false);
    this.stop.complete();
  }

  createWeekDays(): number[] {
    const result = [];
    let dayIndex = this.firstDayOfWeek;
    for (let i = 0; i < 7; i++) {
      result.push(dayIndex);
      dayIndex = dayIndex === 6 ? 0 : ++dayIndex;
    }
    return result;
  }

  applyValue(day: ItskPickerDayModel, event: MouseEvent) {
    this.preventEvent(event);
    if (day === null || day === undefined || day.disabled) {
      return;
    }
    this.applyDate.emit(day.date);
  }

  setDate(day: ItskPickerDayModel, event: MouseEvent) {
    this.preventEvent(event);
    if (day === null || day === undefined || day.disabled) {
      return;
    }
    if (day.date !== null && day.date !== undefined && day.date instanceof Date) {
      this.dateSelected.emit(day.date);
      if (day.date.getMonth() !== this.currentMonth$) {
        this.monthSelected.emit(day.date.getMonth());
      }
      if (day.date.getFullYear() !== this.currentYear$) {
        this.yearSelected.emit(day.date.getFullYear());
      }
    }
  }

  createDays() {
    const days = ItskDatePickerHelper.getPickerDays(
      this.currentYear$,
      this.currentMonth$,
      this.currentDate$,
      this.firstDayOfWeek,
      this.minDate as any,
      this.maxDate as any,
      this.disabledDates as any,
      this.disabledDays as any,
      this.disabledPeriods as any,
    );
    this.weeks = ItskDatePickerHelper.sliceArrayIntoGroups<ItskPickerDayModel>(days, 7);
  }

  checkDays() {
    if (this.weeks) {
      this.weeks = this.weeks.map((week) =>
        week.map((dat: ItskPickerDayModel) => ({
          ...dat,
          selected:
            dat.date?.getFullYear() === this.currentYear$ &&
            dat.date.getMonth() === this.currentMonth$ &&
            dat.date.getDate() === this.currentDate$,
        })),
      );
    }
  }

  scrollMonth(event: WheelEvent) {
    this.preventEvent(event);
    if (event.deltaY > 0) {
      const nextMonth = this.currentMonth$ + 1;
      if (nextMonth < 12) {
        this.monthSelected.emit(nextMonth);
      } else {
        this.monthSelected.emit(0);
        this.yearSelected.emit(this.currentYear$ + 1);
      }
    } else {
      const prevMonth = this.currentMonth$ - 1;
      if (prevMonth > -1) {
        this.monthSelected.emit(prevMonth);
      } else {
        this.monthSelected.emit(11);
        this.yearSelected.emit(this.currentYear$ - 1);
      }
    }
    this.cdr$.detectChanges();
  }

  preventEvent(event: any) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
}
