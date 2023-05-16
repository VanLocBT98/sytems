import { Story, Meta } from '@storybook/react';
import React from 'react';

import MainLayout from '.';

import menuSidebar from 'configs/sidebar';

export default {
  title: 'Components/templates/MainLayout',
  component: MainLayout,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <MainLayout menus={menuSidebar} />
);
