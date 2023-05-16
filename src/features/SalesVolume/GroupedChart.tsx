import React from 'react';

import ChartCustom from 'common/components/organisms/Chart';
import { saleVolumeChartPluginCustom } from 'common/utils/chart';

interface GroupedChartInterface {
  data: any;
}
const GroupedChart: React.FC<GroupedChartInterface> = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      htmlLegend: {
        containerID: 'line-lengend-container-secondary',
      },
      legend: {
        display: false,
      },
      // tooltip: {
      //   callbacks: {
      //     title(tooltipItem: any) {
      //       return tooltipItem[0].dataset.label;
      //     },
      //     label(tooltipItem: any) {
      //       console.log(tooltipItem);
      //     },
      //   },
      // }
    },
    title: {
      display: false,
    },
    categoryPercentage: 0.6,
    barPercentage: 0.5,
    scales: {
      scaleId: {
        ticks: {
          display: false,
        },
        grid: {
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
          display: false,
          borderColor: '#fff',
        },
        ticks: {
          color: '#768289',
          stepSize: 20,
          font: {
            weight: 400,
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
          borderColor: '#fff',
        },
        ticks: {
        }
      }
    }
  };
  return (
    <div className="t-groupedChart">
      <ChartCustom
        type="line"
        data={data}
        options={chartOptions}
        legendCustomId="line-lengend-container-secondary"
        customPlugin={saleVolumeChartPluginCustom}
      />
    </div>
  );
};

export default GroupedChart;
