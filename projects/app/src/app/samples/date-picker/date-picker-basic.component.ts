import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskDatePickerComponent } from '@grafit/components';

@Component({
  selector: 'app-date-picker-basic',
  imports: [ItskDatePickerComponent, FormsModule, DatePipe],
  template: `
    <itsk-date-picker [(ngModel)]="date" />
    <br />
    Value: {{ date | date: 'dd.MM.yyyy' }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerBasicComponent {
  protected date: Date | null = new Date();
}
