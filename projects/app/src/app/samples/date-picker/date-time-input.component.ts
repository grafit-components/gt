import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDateInputComponent, ItskTimeInputComponent } from '@grafit/components';

@Component({
  selector: 'app-date-time-input',
  imports: [ItskDateInputComponent, ItskTimeInputComponent, FormsModule, DatePipe],
  template: `
    <itsk-date-input [(ngModel)]="date" />
    <br />
    <itsk-time-input [(ngModel)]="time" [showSecond]="true" />
    <br />
    Date: {{ date | date: 'dd.MM.yyyy' }}, time: {{ time | date: 'HH:mm:ss' }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeInputComponent {
  protected date: Date | null = new Date();

  protected time: Date | null = new Date();
}
