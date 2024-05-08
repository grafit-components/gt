import { ItskDatePickerModule } from './itsk-date-picker.module';
import { ItskDatePickerComponent } from './itsk-date-picker/itsk-date-picker.component';
import { ItskDatePeriod } from './model/itsk-date-period';

export default {
  component: ItskDatePickerComponent,
  title: 'ItskDatePickerComponent',
  argTypes: {
    disabledDays: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    defaultDate: new Date(),
    disabledDates: [new Date(2020, 7, 11), new Date(2020, 7, 12)],
    disabledDays: [6, 0],
    disabledPeriods: [new ItskDatePeriod(new Date(2020, 7, 20), new Date(2020, 7, 24))],
    maxDate: new Date(2021, 5, 15),
    maxYearDate: new Date(2021, 0, 1),
    minDate: new Date(2019, 8, 10),
    minYearDate: new Date(2019, 0, 1),
  },
};

export const Default = (args: ItskDatePickerComponent) => ({
  moduleMetadata: {
    imports: [ItskDatePickerModule],
  },
  component: ItskDatePickerComponent,
  props: args,
});
