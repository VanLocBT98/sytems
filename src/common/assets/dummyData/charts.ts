import { fillKPIValueChart } from 'common/utils/functions';
import { AgencyInfoTypes } from 'features/Dashboard/Table';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const dataConfig = {
  labels: [...Array(12)].map((_, idx) => `T${idx + 1}`),
  datasets: [
    {
      label: '3Forcom (HCM) 1',
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000)),
      fill: false,
      backgroundColor: '#29CC97',
      borderColor: '#29CC97',
      pointHoverRadius: 5,
      pointRadius: 2,
    },
    {
      label: '3Forcom (HCM) 2',
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000)),
      fill: false,
      backgroundColor: '#285FFA',
      borderColor: '#285FFA',
      pointHoverRadius: 5,
      pointRadius: 2,
    },
    {
      label: '3Forcom (HCM) 3',
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000)),
      fill: false,
      backgroundColor: '#FF4D4F',
      borderColor: '#FF4D4F',
      pointHoverRadius: 5,
      pointRadius: 2,
    },
    {
      label: '3Forcom (HCM) 4',
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000)),
      fill: false,
      backgroundColor: '#FEC400',
      borderColor: '#FEC400',
      pointHoverRadius: 5,
      pointRadius: 2,
    },
  ],
};
// OPTIONS CONFIGURATION
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
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
        borderDash: [2, 4],
        color: '#595959',
        borderColor: '#ffffff', // change color follow by theme
        drawTicks: false,
        label: {
          display: false,
        },
      },
    },
    x: {
      grid: {
        borderColor: '#595959',
        display: false,
      },
    },
    y: {
      // position: 'right',
      grid: {
        borderColor: '#ffffff', // change color follow by theme
        display: false,
      },
    },
  },
};

export const doughnutOptions = {
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
          return `  ${tooltipItem.label} ${percent}`;
        },
      },
    }
  },
};
export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Statistical results chart',
    fontSize: 50,
    fontColor: '#195d76',
    fontStyle: 'bold',
    padding: 32,
  },
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
        borderDash: [2, 4],
        color: '#595959',
        borderColor: '#ffffff', // change color follow by theme
        drawTicks: false,
        label: {
          display: false,
        },
      },
    },
    x: {
      grid: {
        borderColor: '#595959',
        display: false,
      },
      ticks: {
        // callback(value:any) {
        //   return `$${value}`;
        // },
        color: '#8C8C8C',
        font: {
          weight: 700,
          size: 16,
        },
      },
    },
    y: {
      grid: {
        borderColor: '#ffffff', // change color follow by theme
        display: false,
      },
      ticks: {
        callback(value: any) {
          return `${value},00`;
        },
        color: '#8C8C8C',
        font: {
          weight: 700,
          size: 16,
        },
      },
    },
  },
};

// DATA CONFIGURATION
export const barData = {
  labels: [...Array(12)].map((_, idx) => `T${idx + 1}`),
  datasets: [
    {
      type: 'line',
      label: 'Line Dataset',
      data: [1023, 4103, 3200, 4000, 7300, 5300, 3100, 4400, 12000, 14000, 11000, 12500],
      fill: false,
      borderColor: '#586063',
      borderWidth: 2
    },
    {
      data: [4200, 5200, 1500, 800, 1200, 3000, 25200, 3500, 1200, 23100, 2500, 22100],
      backgroundColor: '#1F9971',
      barThickness: 22,
      borderRadius: 3,
      label: 'USD',
      type: 'bar',
    },
    {
      data: [3100, 2500, 1430, 3000, 10000, 53200, 4500, 800, 31600, 3500, 45100, 4800],
      backgroundColor: '#29CC97',
      barThickness: 22,
      borderRadius: 3,
      label: 'VND',
      type: 'bar',
    },
  ],
};
export const doughnutData = {
  labels: [
    'Miền Bắc',
    'Miền Trung',
    'Miền Nam',
  ],
  datasets: [{
    label: 'Doanh thu theo vùng',
    data: [289, 566, 731],
    backgroundColor: [
      '#285FFA',
      '#29CC97',
      '#FEC400',
    ],
    hoverOffset: 2,
  }],
};

export const agencyInfoDataDummy: AgencyInfoTypes[] = [...Array(34)].map((_, i) => ({
  projectCode: `${345435 + i}`,
  projectName: `KT0${i + 1}`,
  channel: `Channel ${i + 1}`,
  brand: 'Heineken',
  agency: 'Nova Eforce',
  productOwner: 'Davison',
  kickoffDate: '23/04/2019',
  endingDate: '23/04/2022',
  updatedAt: '23/04/2021',
  key: i + 1
}));

export const groupedChartByWeek = {
  labels: [
    ['Week 1', '(19 / 09 / 22 - 25 / 09 / 22)'],
    ['Week 2', '(19 / 09 / 22 - 25 / 09 / 22)'],
    ['Week 3', '(19 / 09 / 22 - 25 / 09 / 22)'],
    ['Week 4', '(19 / 09 / 22 - 25 / 09 / 22)'],
  ],
  datasets: [
    {
      label: 'Sales Volume Tiger family (két + thùng)',
      borderColor: '#99C958',
      backgroundColor: '#99C958',
      data: [3, 5, 6, 7],
      borderRadius: 4,
      pointRadius: 6
    },
    {
      label: 'Sales Volume Tiger family (két)',
      borderColor: '#FFCD47',
      backgroundColor: '#FFCD47',
      data: [4, 6, 3, 6],
      borderRadius: 4,
      pointRadius: 6
    },
    {
      label: 'Sales Volume Tiger Crystal (két + thùng)',
      borderColor: '#F6863F',
      backgroundColor: '#F6863F',
      data: [10, 7, 4, 6],
      borderRadius: 4,
      pointRadius: 6
    },
    {
      type: 'line',
      label: 'KPI Sales Volume Tiger family (két + thùng)',
      data: fillKPIValueChart(7, 4),
      borderColor: '#99C958',
      backgroundColor: '#99C958',
      borderWidth: 2,
      pointDotRadius: 0,
      pointRadius: 2,
      borderDash: [10, 5]
    },
    {
      type: 'line',
      label: 'KPI Sales Volume Tiger family (két)',
      data: fillKPIValueChart(9, 4),
      borderColor: '#FFCD47',
      backgroundColor: '#FFCD47',
      borderWidth: 2,
      pointDotRadius: 0,
      pointRadius: 2,
      borderDash: [10, 5]
    },
    {
      type: 'line',
      label: 'KPI Sales Volume Tiger Crystal (két + thùng)',
      data: fillKPIValueChart(5, 4),
      borderColor: '#99C958',
      backgroundColor: '#99C958',
      borderWidth: 2,
      pointDotRadius: 0,
      pointRadius: 2,
      borderDash: [10, 5]
    },
  ]
};
export const groupedChartByOutlet = {
  labels: [
    'Tài Hiếu II',
    'Bò Nướng Tảng Happy',
    'Quán hải Sản F5',
    'Năm Lửa 8',
    'Năm Lửa 6',
  ],
  datasets: [
    {
      label: 'Sales Volume Tiger family (két + thùng)',
      backgroundColor: '#99C958',
      data: [3, 5, 6, 7, 8, 2],
      borderRadius: 4,
    },
    {
      label: 'Sales Volume Tiger family (két)',
      backgroundColor: '#FFCD47',
      data: [4, 7, 3, 6, 9, 3],
      borderRadius: 4,
    },
    {
      label: 'Sales Volume Tiger Crystal (két + thùng)',
      backgroundColor: '#F6863F',
      data: [10, 7, 4, 6, 8, 5],
      borderRadius: 4,
    },
  ]
};
