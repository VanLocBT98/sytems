import { Story, Meta } from '@storybook/react';
import React from 'react';

import HeadingDescription from '.';

export default {
  title: 'Components/molecules/HeadingDescription',
  component: HeadingDescription,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <HeadingDescription
    title=""
  />
);
