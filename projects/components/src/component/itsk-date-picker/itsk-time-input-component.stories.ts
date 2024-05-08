import { ItskDatePickerModule } from './itsk-date-picker.module';
import { ItskTimeInputComponent } from './itsk-time-input/itsk-time-input.component';

export default {
  component: ItskTimeInputComponent,
  title: 'ItskTimeInputComponent',
  args: {
    showSecond: true,
  },
};

export const Default = (args: ItskTimeInputComponent) => ({
  moduleMetadata: {
    imports: [ItskDatePickerModule],
  },
  component: ItskTimeInputComponent,
  props: args,
});
