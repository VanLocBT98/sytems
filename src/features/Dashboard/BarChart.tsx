import { Empty, Spin } from 'antd';
import React from 'react';

import ChartCustom from 'common/components/organisms/Chart';
import { convertMonthAcronym, numberCurrencyFormatter } from 'common/utils/functions';

interface BarChartProps {
  loading?: boolean;
  data?: any;
}

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      color: 'transparent',
      padding: {
        right: 2,
      },
      labels: {
        title: {
          font: {
            weight: 'bold',
            size: 15,
          },
          color: '#ffffff',
          rotation: -90,
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
      },
    }
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
      grid: {
        borderColor: '#fff',
        display: false,
      },
      stacked: true,
      ticks: {
        // callback(value:any) {
        //   return `$${value}`;
        // },
        color: '#768289',
        font: {
          weight: 400,
          size: 12,
        },
      },
    },
    y: {
      stacked: true,
      grid: {
        borderColor: '#ffffff',
        display: false,
      },
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
    },
  },
  elements: {
    point: {
      radius: 1
    }
  }
};
const BarChart: React.FC<BarChartProps> = ({
  data, loading = false
}) => (
  <Spin spinning={loading}>
    {
      data ? (
        <ChartCustom
          type="bar"
          data={data}
          options={barOptions}
        />
      )
        : (
          <Empty />
        )
    }
  </Spin>
);

export default BarChart;
