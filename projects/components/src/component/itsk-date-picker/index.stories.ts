import { ItskDateInputComponent } from './itsk-date-input/itsk-date-input.component';
import { ItskDatePickerModule } from './itsk-date-picker.module';
import { ItskDatePickerComponent } from './itsk-date-picker/itsk-date-picker.component';
import { ItskTimeInputComponent } from './itsk-time-input/itsk-time-input.component';

export default {
  title: 'Date (old)',
};

export const itskDatePicker = () => ({
  component: ItskDatePickerComponent,
  props: {
    disabledDays: [6, 0],
    showTime: true,
    fixed: true,
  },
  moduleMetadata: {
    imports: [ItskDatePickerModule],
  },
});

export const itskDatePickerDemo = () => ({
  moduleMetadata: {
    imports: [ItskDatePickerModule],
  },
  props: {
    demoDate: new Date(2020, 7, 1, 12, 0),
  },
  template: `<itsk-date-picker [(ngModel)]="demoDate" [showTime]="true"></itsk-date-picker>
        <div>Date: {{demoDate | json}}</div>`,
});

export const itskDatePickerDisabledDemo = () => ({
  moduleMetadata: {
    imports: [ItskDatePickerModule],
  },
  props: {
    demoDate: new Date(2020, 7, 1, 12, 0),
  },
  template: `<itsk-date-picker [(ngModel)]="demoDate" [showTime]="true" [disabled]="true"></itsk-date-picker>
        <div>Date: {{demoDate | json}}</div>`,
});

export const itskDateInput = () => ({
  component: ItskDateInputComponent,
  props: {
    showTime: true,
  },
  moduleMetadata: {
    imports: [ItskDatePickerModule],
  },
});

export const itskTimeInput = () => ({
  component: ItskTimeInputComponent,
  props: {
    showSecond: true,
  },
  moduleMetadata: {
    imports: [ItskDatePickerModule],
  },
});
