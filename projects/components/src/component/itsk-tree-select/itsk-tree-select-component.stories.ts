import { ItskTreeSelectComponent } from './itsk-select/itsk-tree-select.component';
import { ItskTreeSelectModule } from './itsk-tree-select.module';

export default {
  component: ItskTreeSelectComponent,
  title: 'ItskSelectComponent',
  args: {
    items: ['First', 'Second', 'Third'],
    multiple: true,
    searchRef: '',
    placeholder: 'empty',
    selectedRef: 'block',
  },
};

export const Default = (args: ItskTreeSelectComponent) => ({
  moduleMetadata: {
    imports: [ItskTreeSelectModule],
  },
  component: ItskTreeSelectComponent,
  props: args,
});
