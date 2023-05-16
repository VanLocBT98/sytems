import { Spin } from 'antd';
import React from 'react';

import Filtering from './Filtering';
import GroupedChart from './GroupedChart';

import { groupedChartByOutlet } from 'common/assets/dummyData/charts';
import ContentOverview from 'common/components/templates/ContentOverview';

const Outlet: React.FC = () => (
  <Spin spinning={false}>
    <div className="p-outlet">
      <ContentOverview title="MOC PROJECT">
        <Filtering />
        <GroupedChart
          data={groupedChartByOutlet}
        />
      </ContentOverview>
    </div>
  </Spin>
);

export default Outlet;
