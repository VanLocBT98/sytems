import { Story, Meta } from '@storybook/react';
import React from 'react';

import UnAuthentication from '.';

export default {
  title: 'Components/templates/UnAuthentication',
  component: UnAuthentication,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <UnAuthentication />
);
