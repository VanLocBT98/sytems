import { Story, Meta } from '@storybook/react';
import React from 'react';

import StatisticalCard from '.';

export default {
  title: 'Components/organisms/StatisticalCard',
  component: StatisticalCard,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <StatisticalCard label="sdf" number="1.758" increasingPercent="+ 2.5%" />
);
