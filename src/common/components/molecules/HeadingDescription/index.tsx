import { Space, Typography } from 'antd';
import React from 'react';

interface HeadingDescriptionProps {
  title: string;
  description?: string;
}

const HeadingDescription: React.FC<HeadingDescriptionProps> = ({ title, description }) => (
  <div className="m-headingDescription">
    <Space direction="vertical" style={{ width: '100%', alignItems: 'center' }} size={0}>
      <Typography.Title level={4} style={{ color: '#2F3437' }}>
        {title}
      </Typography.Title>
      <div className="mt-8">
        <Typography.Text style={{
          textAlign: 'center', fontSize: 14, color: '#464E52'
        }}
        >
          {description}
        </Typography.Text>
      </div>
    </Space>
  </div>
);

export default HeadingDescription;
