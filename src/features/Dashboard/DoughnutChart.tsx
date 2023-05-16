import { Empty, Spin } from 'antd';
import React from 'react';

import ChartCustom from 'common/components/organisms/Chart';

interface DoughnutProps {
  data?: any;
  loading?: boolean;
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: 'doughnut-legend-container',
    },
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      labels: {
        title: {
          font: {
            weight: 'bold',
            size: 15,
          },
          color: 'red',
        },
      },
    },
    tooltip: {
      callbacks: {
        title(tooltipItem: any) {
          return tooltipItem[0].dataset.label;
        },
        label(tooltipItem: any) {
          const total = tooltipItem.dataset.data.reduce((val: any, curr: any) => val + curr, 0);
          const percent = `${((tooltipItem.raw / total) * 100).toFixed(2)}%`;
          return `  ${tooltipItem.label}: ${tooltipItem.raw} tỷ (${percent})`;
        },
      },
    }
  },
  elements: {
    center: {
      text: 'Tỷ',
      color: '#090A0A',
      minFontSize: 15
    }
  }
};
const DoughnutChart: React.FC<DoughnutProps> = ({ data, loading = false }) => (
  <Spin spinning={loading}>
    {
      data ? (
        <ChartCustom
          type="doughnut"
          data={data}
          options={doughnutOptions}
          legendCustomId="doughnut-legend-container"
          width={220}
          height={220}
        />
      ) : <Empty />
    }
  </Spin>
);
export default DoughnutChart;
