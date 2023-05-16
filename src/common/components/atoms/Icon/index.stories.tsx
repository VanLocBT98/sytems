import { Story, Meta } from '@storybook/react';
import React from 'react';

import Icon, { iconList, IconName } from '.';

export default {
  title: 'Components/atoms/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['14x14', '16x16', '18x18', '18x18'],
      },
      defaultValue: '18x18',
    },
  },
} as Meta;

const listIcon = Object.keys(iconList).map((item) => item as IconName);

export const normal: Story = ({ size }) => (
  <div style={{
    backgroundColor: '#ddd',
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
  }}
  >
    {listIcon.map((item, idx) => (
      <div style={{ marginLeft: 5 }} key={`${idx.toString()}sdaf`}>
        <Icon size={size} iconName={item} />
      </div>
    ))}
  </div>
);
