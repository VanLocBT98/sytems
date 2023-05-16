import { Story, Meta } from '@storybook/react';
import React from 'react';

import ContentOverview from '.';

export default {
  title: 'Components/templates/ContentOverview',
  component: ContentOverview,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <ContentOverview />
);
