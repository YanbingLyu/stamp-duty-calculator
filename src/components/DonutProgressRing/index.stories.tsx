import React from 'react';
import { Story, Meta } from '@storybook/react';
import { theme } from '@lendi-ui/theme';

import DonutProgressRing, { DonutProgressRingProps } from './index';

export default {
  title: 'Components/Donut Progress Ring',
  component: DonutProgressRing,
  argTypes: {
    activeColour: { control: 'select', options: theme.colors, defaultValue: theme.colors['secondary.500'] },
    percentage: { control: { type: 'range', min: 0, max: 100, step: 1 }, defaultValue: 30 },
    circleSize: { control: { type: 'range', min: 80, max: 190, step: 1 }, defaultValue: 130 },
    isAntiClosewise: { control: 'boolean' },
    mainLabel: { control: { type: 'text' }, defaultValue: '$90,000' },
    mainLabelFontSize: {
      defaultValue: 'xs',
      options: ['xxs', 'xs', 'sm', 'md'],
      control: { type: 'radio' },
    },
    subLabel: { control: { type: 'text' }, defaultValue: 'Deposit' },
    subLabelFontSize: {
      defaultValue: 'sm',
      options: ['xxs', 'xs', 'sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as Meta;
const Template: Story<DonutProgressRingProps> = (args) => <DonutProgressRing {...args} />;

export const Default = Template.bind({});
