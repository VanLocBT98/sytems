import {
  Button, Space, Spin, Typography
} from 'antd';
import React, { useState } from 'react';

import GroupedChart from './GroupedChart';

import { groupedChartByWeek } from 'common/assets/dummyData/charts';
import ContentOverview from 'common/components/templates/ContentOverview';

const SalesVolume: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <Spin spinning={false}>
      <div className="p-salesVolume">
        <ContentOverview title="MOC PROJECT">
          <div className="p-salesVolume_viewBy">
            <Space size={12}>
              <Typography.Text
                style={{
                  fontSize: 14,
                  lineHeight: '20px',
                  fontWeight: 500,
                  color: '#2C3032'
                }}
              >
                View by:
              </Typography.Text>
              <div className="p-salesVolume_viewBy_button">
                <Space size={16}>
                  <Button type={activeIdx === 0 ? 'primary' : 'default'} onClick={() => setActiveIdx(0)}>
                    Week
                  </Button>
                  <Button type={activeIdx === 1 ? 'primary' : 'default'} onClick={() => setActiveIdx(1)}>
                    Region
                  </Button>
                  <Button type={activeIdx === 2 ? 'primary' : 'default'} onClick={() => setActiveIdx(2)}>
                    Province
                  </Button>
                </Space>
              </div>
            </Space>
          </div>
          <GroupedChart
            data={groupedChartByWeek}
          />
        </ContentOverview>
      </div>
    </Spin>
  );
};

export default SalesVolume;
