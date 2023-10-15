import {ItskSelectModule} from './itsk-select.module';
import {ItskSelectComponent} from './itsk-select/itsk-select.component';

export default {
    component: ItskSelectComponent,
    title: 'ItskSelectComponent',
    args: {
        items: ['First', 'Second', 'Third'],
        multiple: true,
        searchRef: '',
        placeholder: 'empty',
        selectedRef: 'block',
    }
}

export const Default = (args: ItskSelectComponent) => ({
    moduleMetadata: {
        imports: [ItskSelectModule]
    },
    component: ItskSelectComponent,
    props: args
});
