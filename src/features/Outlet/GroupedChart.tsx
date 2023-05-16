import React from 'react';

import ChartCustom from 'common/components/organisms/Chart';

interface GroupedChartInterface {
  data: any;
}
const GroupedChart: React.FC<GroupedChartInterface> = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    legend: {
      position: 'top'
    },
    title: {
      display: false,
    },
    categoryPercentage: 0.6,
    barPercentage: 0.8,
    scales: {
      scaleId: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: false,
          borderColor: '#fff',
        },
        ticks: {
          color: '#768289',
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
      }
    }
  };
  return (
    <div className="t-groupedChart">
      <ChartCustom
        type="bar"
        data={data}
        options={chartOptions}
      />
    </div>
  );
};

export default GroupedChart;
