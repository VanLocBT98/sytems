import {
  Col, Row, Spin, Typography
} from 'antd';
import React from 'react';

interface TableChartProps {
  title: string;
  table?: React.ReactNode;
  chart?: React.ReactNode;
  isLoading?: boolean;
}

const TableChart: React.FC<TableChartProps> = ({
  title,
  table,
  chart,
  isLoading = false
}) => (
  <div className="t-tableChart">
    <Typography.Title
      level={3}
      style={{
        fontWeight: 600,
        color: '#090a0a',
      }}
    >
      {title}
    </Typography.Title>
    <Spin spinning={isLoading}>
      <Row
        gutter={[16, 16]}
        style={{ width: '100%', marginTop: 16 }}
        align="middle"
      >
        {
          table
          && (
            <Col span={24} lg={chart ? 12 : 24}>
              {table}
            </Col>
          )
        }
        {
          chart
          && (
            <Col span={24} lg={table ? 12 : 24}>
              <div className="t-tableChart_border">
                {chart}
              </div>
            </Col>
          )
        }
      </Row>
    </Spin>
  </div>
);

export default TableChart;
