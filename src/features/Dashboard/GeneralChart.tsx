/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Space } from 'antd';
import React from 'react';

import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import DashboardTable from './Table';
import { agencyOptionsDummy, yearOptionsDummy } from './dummy';

import {
  agencyInfoDataDummy, barData, dataConfig, doughnutData
} from 'common/assets/dummyData/charts';
import ChartPanel from 'common/components/organisms/ChartPanel';

const GeneralChart: React.FC = () => (
  <div className="t-generalChart">
    <Row gutter={[24, 24]}>
      <Col span={24} xl={12} lg={24}>
        <ChartPanel
          label="Tổng doanh thu"
          agencyOptions={agencyOptionsDummy}
          timeOptions={yearOptionsDummy}
        >
          <BarChart data={barData} />

        </ChartPanel>
      </Col>
      <Col span={24} xl={12} lg={24}>
        <ChartPanel
          label="Doanh thu theo vùng"
          agencyOptions={agencyOptionsDummy}
          timeOptions={yearOptionsDummy}
        >
          <DoughnutChart
            data={doughnutData}
          />
        </ChartPanel>
      </Col>
      <Col span={24}>
        <Space size={24} direction="vertical" style={{ width: '100%' }}>
          <ChartPanel
            label="Doanh thu theo Agency"
            agencyOptions={agencyOptionsDummy}
            timeOptions={yearOptionsDummy}
          >
            <LineChart dataConfig={dataConfig} />
          </ChartPanel>
          <DashboardTable data={agencyInfoDataDummy} />
        </Space>
      </Col>
    </Row>
  </div>
);

export default GeneralChart;
