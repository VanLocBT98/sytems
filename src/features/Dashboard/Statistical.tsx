import { Col, Row } from 'antd';
import React from 'react';

import StatisticalCard, { StatisticalCardProps } from 'common/components/organisms/StatisticalCard';

interface StatisticalProps {
  data: StatisticalCardProps[];
}

const Statistical: React.FC<StatisticalProps> = ({ data }) => (
  <div className="t-statistical">
    <Row gutter={[24, 24]}>
      {
        data.length > 0 && data.map((d, i) => (
          <Col span={12} xl={6} lg={12} key={`item-${i.toString()}`}>
            <StatisticalCard
              {...d}
            />
          </Col>
        ))
      }
    </Row>
  </div>
);

export default Statistical;
