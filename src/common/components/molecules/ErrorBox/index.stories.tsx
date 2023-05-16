import { Story, Meta } from '@storybook/react';
import React from 'react';

import ErrorBox from '.';

export default {
  title: 'Components/molecules/ErrorBox',
  component: ErrorBox,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <ErrorBox errors={[]} />
);
