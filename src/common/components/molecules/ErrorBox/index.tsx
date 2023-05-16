import { Space, Typography } from 'antd';
import React from 'react';

import Icon from 'common/components/atoms/Icon';

interface ErrorBoxProps {
  errors: ErrorResponse[];
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ errors }) => (
  <div className="m-errorBox">
    <Space style={{ width: '100%' }} align="start" size={10}>
      <div className="m-errorBox_iconWrapper">
        <Icon iconName="delete" size="14x14" />
      </div>
      <div>
        {
          errors.map((val, idx) => (
            <Typography.Text
              key={`error-${idx.toString()}`}
              type="warning"
              style={{
                fontSize: 14,
                lineHeight: '22px',
                display: 'block'
              }}
            >
              {val.message}
            </Typography.Text>
          ))
        }
      </div>
    </Space>
  </div>
);

ErrorBox.defaultProps = {
  errors: []
};

export default ErrorBox;
