import {Meta} from '@storybook/angular';
import {withKnobs} from '@storybook/addon-knobs';
import {iconsList} from './icons-list';
// @ts-ignore
import mdx from './icon.mdx';
import {IconSampleModule} from './icon-sample/icon-sample.module';
import {IconSampleComponent} from './icon-sample/icon-sample/icon-sample.component';

export default {
  title: 'Icon',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  component: IconSampleComponent,
  moduleMetadata: {
    imports: [IconSampleModule]
  }
} as Meta;

export const iconList = () => ({
  moduleMetadata: {
    imports: [IconSampleModule]
  },
  props: {
    icons: iconsList,
  },
  template: `<itsk-icon-sample></itsk-icon-sample>`,
});
