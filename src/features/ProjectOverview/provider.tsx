import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo, useState } from 'react';

import { tableShareDummy } from 'common/assets/dummy/table';
import {
  GiftAllocationDataTypes,
  ProjectProgressDataTypes,
  Provinces, TableShareTypes
} from 'common/services/trackings/types';
import { capitalizeFirstLetter } from 'common/utils/functions';

type DataType = {
  title?: string;
  planned?: number;
  actual?: number;
  ratio?: string;
  id?: number;
};

export type ProjectProgressFormattedTypes = {
  key: string;
  type: string;
  ratio: string;
} & DataType;

export type FilterType = {
  region?: string;
  dateRange?: string[];
  regionList?: Provinces[];
};

type TableChartTypes = {
  chart: any;
  table: DataType[];
  chartConfig: any;
};

interface Args {
  columns: ColumnsType<DataType>;
  tableShareColumns: ColumnsType<DataType>;
  projectProgressData: {
    chart: any;
    table: DataType[];
    chartConfig: any;
  };
  tableShare: TableChartTypes;
  giftAllocationData: TableChartTypes;
}

interface Props {
  tableShareData?: TableShareTypes;
  pieGiftAllocationData?: GiftAllocationDataTypes;
  projectProgress?: ProjectProgressDataTypes;
  children: (arg: Args) => React.ReactNode;
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    // barArbitrary: {
    //   lineColor: 'blue'
    // },
    title: {
      display: false,
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
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
        // borderColor: '#fff',
      },
      stacked: true,
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
      stacked: false,
      grid: {
        display: true,
        drawBorder: false,
        drawOnChartArea: true,
        drawTicks: false,
        borderColor: '#fff',
      },
      ticks: {
        stepSize: 20,
      },
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
};

const configBarChart = {
  ...barOptions,
  plugins: {
    ...barOptions.plugins,
    tooltip: {
      callbacks: {
        title(tooltipItem: any) {
          return tooltipItem[0].dataset.label;
        },
        label(tooltipItem: any) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
    datalabels: {
      color: '#EFF1F2',
      formatter(value: any) {
        return `${value.toFixed(2)}%`;
      }
    }
  },
  scales: {
    ...barOptions.scales,
    y: {
      ...barOptions.scales.y,
      ticks: {
        callback(value: any) {
          return `${value}%`;
        },
      },
    },
    x: {
      ...barOptions.scales.x,
      ticks: {
        font: {
          size: 10,
        },
      },
    },
  },
};

const TableChartProvider: React.FC<Props> = ({
  children,
  projectProgress,
  tableShareData,
  pieGiftAllocationData,
}) => {
  const [projProgress, setProjectProgress] = useState<
    ProjectProgressFormattedTypes[]
  >([]);

  useEffect(() => {
    const res: ProjectProgressFormattedTypes[][] = projectProgress
      ? Object.values(projectProgress).map(
        (d, i) => Object.values(d).map((item, idx) => ({
          title: item.skuName,
          planned: item.planned,
          actual: item.actual,
          ratio: `${(isNaN(item.ratio) ? item.ratio : item.ratio * 100).toFixed(2)
            }%`,
          key: Object.keys(d)[idx],
          type: Object.keys(projectProgress)[i],
        })),
      )
      : [];
    const result = res.reduce(
      (p: ProjectProgressFormattedTypes[], c) => [...p, ...c],
      [],
    )
      .reduce(
        (p: ProjectProgressFormattedTypes[], c) => (p.some((x) => x.key === c.key)
          ? p
          : [...p, c]),
        [],
      )
      .map((v) => (v.type === 'projectProgress'
        ? {
          ...v,
          title: capitalizeFirstLetter(v.key),
        }
        : v));
    setProjectProgress(result);
  }, [projectProgress]);

  // BAR Project Progress
  const projectProgressData = useMemo(() => ({
    table: projProgress,
    chart: {
      labels: projProgress?.map((v) => v.title?.split('(').map((
        item,
      ) => (item.includes(')') ? `(${item}` : item))),
      datasets: [
        {
          backgroundColor: ['#F6863F', '#99C958', '#4C7DC0', '#4C7DC0', '#4C7DC0'],
          barThickness: 52,
          borderRadius: 0,
          data: projProgress?.map((v) => Number(v.ratio.replace(/%/g, ''))),
        },
      ],
    },
    chartConfig: configBarChart,
  }), [projProgress]);

  // PIE Table Share Configuration

  const tableShare = useMemo(() => ({
    table: tableShareData ? [
      {
        title: 'Avg. Table',
        value: tableShareData.table.toFixed(0),
        id: 1,
      },
      {
        title: 'Avg. Brand table',
        value: tableShareData.brand.toFixed(0),
        id: 2,
      },
      {
        title: 'KPI',
        value: tableShareData
          ? `${tableShareData.kpiTableShare}%`
          : null,
        id: 3,
      },
    ] : [],
    chart: tableShareData ? {
      labels: ['Actual'],
      datasets: [
        {
          backgroundColor: ['#99C958', '#EFF0F0'],
          data: [tableShareData.ratio * 100, 100 - tableShareData.ratio * 100],
        },
      ],
    } : undefined,
    chartConfig: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        htmlLegend: {
          containerID: 'pie-legend-container',
          value: tableShareDummy.map((v) => v.value),
          modify: 'tableShare',
        },
        datalabels: {
          formatter(value: any) {
            return `${value.toFixed(2)}%`;
          }
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            // title(tooltipItem: any) {
            //   return tooltipItem[0].dataset.label;
            // },
            label(tooltipItem: any) {
              return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
            },
          },
        },
      },
    },
  }), [tableShareData]);

  const giftAllocationData = useMemo(() => ({
    table: [],
    chart: pieGiftAllocationData ? {
      labels: ['Used', 'Remained'],
      datasets: [
        {
          backgroundColor: ['#872284', '#FFCD47'],
          data: [pieGiftAllocationData.averageUsed, pieGiftAllocationData.remained],
        },
      ],
    } : undefined,
    chartConfig: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        htmlLegend: {
          containerID: 'pie-legend-giftAllocation',
          title: true,
          value: [pieGiftAllocationData?.averageUsed.toFixed(0),
          pieGiftAllocationData?.remained.toFixed(0)],
        },
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: '#fff',
          formatter(value: any) {
            return `${Math.round(value)}`;
          }
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label(tooltipItem: any) {
              return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(0)}`;
            },
          },
        },
      },
    },
  }), [pieGiftAllocationData]);

  // COLUMNS HEADERS CONFIGURATION
  const columns: ColumnsType<DataType> = [
    {
      title: null,
      width: 300,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Planned',
      dataIndex: 'planned',
      key: 'planned',
      width: 100,
    },
    {
      title: 'Actual',
      dataIndex: 'actual',
      key: 'actual',
      width: 100,
    },
    {
      title: 'Ratio',
      dataIndex: 'ratio',
      key: 'ratio',
      width: 100,
    },
  ];

  const tableShareColumns: ColumnsType<DataType> = [
    {
      title: null,
      width: 140,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 160,
    },
  ];

  return (
    <>
      {children({
        columns,
        projectProgressData,
        tableShare,
        tableShareColumns,
        giftAllocationData,
      })}
    </>
  );
};

export default TableChartProvider;
