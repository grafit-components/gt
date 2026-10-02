import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDatePickerComponent } from '@grafit/components';

@Component({
  selector: 'app-date-picker-time',
  imports: [ItskDatePickerComponent, FormsModule, DatePipe],
  template: `
    <itsk-date-picker [(ngModel)]="date" [showTime]="true" [showSeconds]="true" />
    <br />
    Value: {{ date | date: 'dd.MM.yyyy HH:mm:ss' }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerTimeComponent {
  protected date: Date | null = new Date();
}
