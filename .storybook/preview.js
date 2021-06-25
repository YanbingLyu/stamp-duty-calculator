import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Theme from '@lendi-ui/theme';

addDecorator(withInfo);
addDecorator((story) => <Theme>{story()}</Theme>);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
