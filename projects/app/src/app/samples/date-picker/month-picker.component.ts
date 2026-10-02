import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItskMonthPickerComponent } from '@grafit/components';

@Component({
  selector: 'app-month-picker',
  imports: [ItskMonthPickerComponent, FormsModule, DatePipe],
  template: `
    <itsk-month-picker [(ngModel)]="month" />
    <br />
    Value: {{ month | date: 'MM.yyyy' }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthPickerComponent {
  protected month: Date | null = new Date();
}
