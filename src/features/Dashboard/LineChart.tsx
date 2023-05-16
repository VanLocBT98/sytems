import { Empty, Spin } from 'antd';
import React from 'react';

import ChartCustom from 'common/components/organisms/Chart';
import { convertMonthAcronym, numberCurrencyFormatter } from 'common/utils/functions';

interface LineChartProps {
  dataConfig?: any;
  loading?: boolean;
}

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: 'line-legend-container',
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
          return `  ${convertMonthAcronym(tooltipItem.label)}: ${tooltipItem.raw} tỷ`;
        },
      }
    },
  },
  scales: {
    scaleId: {
      ticks: {
        display: false,
      },
      title: {
        display: true,
      },
      grid: {
        // borderDash: [2, 4],
        color: '#EFF1F2',
        borderColor: '#EFF1F2',
        drawTicks: false,
        label: {
          display: false,
        },
      },
    },
    x: {
      ticks: {
        color: '#EFF1F2',
        font: {
          weight: 400,
          size: 12,
        },
      },
      grid: {
        borderColor: '#595959',
        display: false,
      },
    },
    y: {
      ticks: {
        callback(value: any) {
          return numberCurrencyFormatter(value, 0);
        },
        color: '#768289',
        font: {
          weight: 400,
          size: 12,
        },
      },
      grid: {
        borderColor: '#ffffff', // change color follow by theme
        display: false,
      },
    },
  },
};

const LineChart: React.FC<LineChartProps> = ({
  dataConfig,
  loading = false
}) => (
  <Spin spinning={loading}>
    {
      dataConfig
        ? (
          <ChartCustom
            type="line"
            data={dataConfig}
            options={options}
            legendCustomId="line-legend-container"
          />
        )
        : (
          <Empty />
        )
    }
  </Spin>
);

export default LineChart;
