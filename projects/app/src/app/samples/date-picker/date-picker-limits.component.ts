import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDatePickerComponent } from '@grafit/components';

const DAY = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-date-picker-limits',
  imports: [ItskDatePickerComponent, FormsModule, DatePipe],
  template: `
    <itsk-date-picker [(ngModel)]="date" [minDate]="minDate" [maxDate]="maxDate" [disabledDays]="weekend" />
    <br />
    Value: {{ date | date: 'dd.MM.yyyy' }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerLimitsComponent {
  private today = new Date();

  /** Доступны две недели назад и две недели вперёд */
  protected minDate = new Date(this.today.getTime() - 14 * DAY);
  protected maxDate = new Date(this.today.getTime() + 14 * DAY);

  /** Номера дней недели как в `Date.getDay()`: 0 — воскресенье, 6 — суббота */
  protected weekend = [0, 6];

  protected date: Date | null = null;
}
