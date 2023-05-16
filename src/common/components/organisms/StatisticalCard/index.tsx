import { Space, Typography } from 'antd';
import React from 'react';

import Icon from 'common/components/atoms/Icon';
import { toCommas } from 'common/utils/functions';

export interface StatisticalCardProps {
  label: string;
  number: string;
  increasingPercent: string;
  isIncreased?: boolean;
}

const StatisticalCard: React.FC<StatisticalCardProps> = ({
  label, number, increasingPercent, isIncreased
}) => (
  <div className="o-statisticalCard">
    <div className="o-statisticalCard_label">
      <Typography.Text style={{
        color: '#798082',
        fontSize: 14,
        fontWeight: 500
      }}
      >
        {label}
      </Typography.Text>
    </div>
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Typography.Text style={{
        color: '#090A0A',
        fontSize: 32,
        fontWeight: 600
      }}
      >
        {toCommas(number)}
      </Typography.Text>
      <Space size={0}>
        <Icon iconName={isIncreased ? 'caretGreen' : 'caretRed'} size="16x16" />
        <Typography.Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: isIncreased ? '#29CC97' : '#FF4D4F'
          }}
        >
          {isIncreased ? '+' : '-'}
          {increasingPercent}
        </Typography.Text>
      </Space>

    </Space>
  </div>
);

export default StatisticalCard;
