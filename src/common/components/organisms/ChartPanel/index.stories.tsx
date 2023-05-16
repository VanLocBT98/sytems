import { Story, Meta } from '@storybook/react';
import React from 'react';

import ChartPanel from '.';

export default {
  title: 'Components/organisms/ChartPanel',
  component: ChartPanel,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <ChartPanel label="Doanh thu" />
);
