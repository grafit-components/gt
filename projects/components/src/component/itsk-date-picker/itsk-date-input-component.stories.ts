import {ItskDatePickerModule} from './itsk-date-picker.module';
import {ItskDateInputComponent} from './itsk-date-input/itsk-date-input.component';

export default {
    component: ItskDateInputComponent,
    title: 'ItskDateInputComponent',
    args: {
        maxYear: 2021,
        minYear: 2019
    }
}

export const Default = (args: ItskDateInputComponent) => ({
    moduleMetadata: {
        imports: [ItskDatePickerModule]
    },
    component: ItskDateInputComponent,
    props: args
});
