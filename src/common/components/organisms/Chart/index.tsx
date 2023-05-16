import {
  Chart, ArcElement,
  registerables,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import {
  Bar,
  Line,
  Pie,
  Doughnut,
} from 'react-chartjs-2';

import htmlLegendGeneralPlugin, {
  barArbitraryCustomPlugin,
  htmlLegendPiePlugin,
  doughnutCustomPlugin, htmlLegendLinePlugin
} from 'common/utils/chart';
import mapModifiers from 'common/utils/functions';

Chart.register(ChartDataLabels);

type ShapeType = 'bar' | 'line' | 'pie' | 'doughnut' | 'barArbitrary';
export interface ChartCustomProps {
  data: any;
  options?: any;
  height?: number | string;
  width?: number | string;
  legendCustomId?: string;
  type?: ShapeType;
  customPlugin?: any;
  customClass?: string;
}
// register Plugins
Chart.register(ArcElement);
Chart.register(...registerables);
// config datalabels: https://chartjs-plugin-datalabels.netlify.app/guide/options.html#scriptable-options

const ChartCustom: React.FC<ChartCustomProps> = ({
  data, options, height, width, type, legendCustomId, customPlugin, customClass
}) => {
  const renderChartType = () => {
    switch (type) {
      case 'line':
        return (
          <Line
            data={data}
            options={options}
            height={height}
            width={width}
            plugins={legendCustomId ? [customPlugin || htmlLegendLinePlugin] : undefined}
          />
        );
      case 'bar':
        return (
          <Bar
            data={data}
            options={options}
            height={height}
            width={width}
            plugins={legendCustomId ? [htmlLegendGeneralPlugin] : undefined}
          />
        );
      case 'barArbitrary':
        return (
          <Bar
            data={data}
            height={height}
            options={options}
            width={width}
            plugins={legendCustomId ? [barArbitraryCustomPlugin] : undefined}
          />
        );
      case 'pie':
        return (
          <Pie
            plugins={legendCustomId ? [customPlugin || htmlLegendPiePlugin] : undefined}
            data={data}
            options={options}
            height={height}
            width={width}
          />
        );
      case 'doughnut':
        return (
          <Doughnut
            plugins={legendCustomId ? [doughnutCustomPlugin] : undefined}
            data={data}
            options={options}
            height={height}
            width={width}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={mapModifiers('o-chart', type, customClass)}>
      {
        type === 'line' && legendCustomId && <div id={legendCustomId} className="o-chart_legendCustom" />
      }
      <div className={`o-chart_panel ${!(data && data.datasets[0].data && data.labels.length > 0) && 'empty'}`}>
        {data && data.datasets[0].data && data.labels.length > 0 ? renderChartType()
          : null}
      </div>
      {
        type !== 'line' && legendCustomId && <div id={legendCustomId} className="o-chart_legendCustom" />
      }
    </div>
  );
};

ChartCustom.defaultProps = {
  options: {},
  height: undefined,
  width: undefined,
  legendCustomId: '',
};

export default ChartCustom;
