import { Story, Meta } from '@storybook/react';
import React from 'react';

import PageTable from '.';

export default {
  title: 'Components/templates/PageTable',
  component: PageTable,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <PageTable />
);
