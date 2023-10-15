import {Meta} from '@storybook/angular';
import {boolean, select, withKnobs} from '@storybook/addon-knobs';
// @ts-ignore
import mdx from './grid.mdx';
import {GridSamplesModule} from './grid-samples/grid-samples.module';
import {ItskGridComponent} from './component/itsk-grid/itsk-grid.component';
import {action} from '@storybook/addon-actions';
import {ItskGridEditType} from './model/enum/itsk-grid-edit-type.enum';
import {ItskGridEditEvent} from './model/enum/itsk-grid-edit-event.enum';

export default {
  title: 'Grid',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  component: ItskGridComponent,
  moduleMetadata: {
    imports: [GridSamplesModule]
  }
} as Meta;

export const basicGrid = () => ({
  moduleMetadata: {
    imports: [GridSamplesModule]
  },
  props: {
    virtual: boolean('virtual', false),
    editType: select('editType', {
      Cell: ItskGridEditType.Cell,
      Row: ItskGridEditType.Row
    }, ItskGridEditType.Cell),
    selectType: select('selectType', [
      'none',
      'single',
      'multiple'
    ], 'multiple'),
    selectRowsBy: select('selectRowsBy', [
      'checkbox',
      'mouse'
    ], 'checkbox'),
    editEvent: select('editEvent', {
      Click: ItskGridEditEvent.Click,
      DoubleClick: ItskGridEditEvent.DoubleClick,
      Enter: ItskGridEditEvent.Enter,
      Focus: ItskGridEditEvent.Focus,
      None: ItskGridEditEvent.None,
    }, ItskGridEditEvent.Click),
    log: (name: any, value: any) => {
      action(name)(value);
    }
  },
  template: `<itsk-basic (action)="log($event.name, $event.value)"
                          [virtual]="virtual"
                          [editEvent]="editEvent"
                          [editType]="editType"
                          [selectRowsBy]="selectRowsBy"
                          [selectType]="selectType"></itsk-basic>`
});
export const groupingGrid = () => ({
  moduleMetadata: {
    imports: [GridSamplesModule]
  },
  template: `<itsk-grouping-grid></itsk-grouping-grid>`
});
export const treeGrid = () => ({
  moduleMetadata: {
    imports: [GridSamplesModule]
  },
  template: `<itsk-tree-grid></itsk-tree-grid>`
});
export const customComponentsGrid = () => ({
  moduleMetadata: {
    imports: [GridSamplesModule]
  },
  template: `<itsk-custom-components></itsk-custom-components>`
});
