import { withKnobs } from '@storybook/addon-knobs';
import { Meta } from '@storybook/angular';
import { iconsList } from './icons-list';
// @ts-ignore
import { IconSampleModule } from './icon-sample/icon-sample.module';
import { IconSampleComponent } from './icon-sample/icon-sample/icon-sample.component';
import mdx from './icon.mdx';

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
    imports: [IconSampleModule],
  },
} as Meta;

export const iconList = () => ({
  moduleMetadata: {
    imports: [IconSampleModule],
  },
  props: {
    icons: iconsList,
  },
  template: `<itsk-icon-sample></itsk-icon-sample>`,
});
