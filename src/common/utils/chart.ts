/* eslint-disable no-underscore-dangle */
import { numberWithPrefix, toCommas } from 'common/utils/functions';

const getOrCreateLegendList = (_: any, id: any, title?: boolean) => {
  const legendContainer = document.getElementById(id);
  if (!legendContainer) return null;
  let listContainer = legendContainer.querySelector('ul');
  let titleDiv = legendContainer.querySelector('div');

  if (!listContainer) {
    if (title) {
      titleDiv = document.createElement('div');
      titleDiv.classList.add('o-chart_legendCustom_title');
      legendContainer.appendChild(titleDiv);
    }
    listContainer = document.createElement('ul');
    listContainer.classList.add('o-chart_legendCustom_container');

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};
const htmlLegendGeneralPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart: any, _: any, opts: any) {
    const ul = getOrCreateLegendList(chart, opts.containerID);

    if (!ul) return;
    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    items.forEach((item: any) => {
      const li = document.createElement('li');
      li.classList.add('o-chart_legendCustom_items');

      li.onclick = () => {
        const chartConfig = chart.config;

        if (chartConfig.type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add('o-chart_legendCustom_box');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = `${item.lineWidth}px`;

      // Text
      const textContainer = document.createElement('span');
      const decsContainer = document.createElement('p');
      const wrapper = document.createElement('div');
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      const desc = document.createTextNode(
        `${numberWithPrefix(chart.data.datasets[0].data[item.index], '.')} Tỷ`,
      );
      textContainer.appendChild(text);
      decsContainer.appendChild(desc);
      wrapper.appendChild(textContainer);
      wrapper.appendChild(decsContainer);

      li.appendChild(boxSpan);
      li.appendChild(wrapper);
      ul.appendChild(li);
    });
  },
};
export const htmlLegendLinePlugin = {
  id: 'htmlLegend',
  afterUpdate(chart: any, _: any, opts: any) {
    const ul = getOrCreateLegendList(chart, opts.containerID);

    if (!ul) return;
    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    items.forEach((item: any, idx: number) => {
      const li = document.createElement('li');
      li.classList.add('o-chart_legendCustom_item');

      li.onclick = () => {
        const chartConfig = chart.config;
        if (chartConfig.type === 'pie') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add('o-chart_legendCustom_box');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = `${item.lineWidth}px`;

      // Text
      const textContainer = document.createElement('span');
      const decsContainer = document.createElement('p');
      const wrapper = document.createElement('div');
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
      const totalValue = chart.config._config.data.datasets[idx]
        .data.reduce((val: any, curr: any) => val + curr, 0);

      const text = document.createTextNode(item.text);
      const desc = document.createTextNode(
        `${numberWithPrefix(totalValue, '.')} Tỷ`,
      );
      textContainer.appendChild(text);
      decsContainer.appendChild(desc);
      wrapper.appendChild(textContainer);
      wrapper.appendChild(decsContainer);

      li.appendChild(boxSpan);
      li.appendChild(wrapper);
      ul.appendChild(li);
    });
  },
};

export const doughnutCustomPlugin = {
  ...htmlLegendGeneralPlugin,
  beforeDraw(chart: any) {
    if (chart.config._config.options.elements && chart.config._config.options.elements.center) {
      // Get ctx from string
      const { ctx } = chart;

      // Get options from the center object in options
      const centerConfig = chart.config._config.options.elements.center;
      const totalValue = chart.config._config.data
        .datasets[0].data.reduce((val: any, curr: any) => val + curr, 0);

      const fontStyle = centerConfig.fontStyle || 'Arial';
      const txt = `${toCommas(totalValue)} ${centerConfig.text}`;
      const color = centerConfig.color || '#000';
      const maxFontSize = centerConfig.maxFontSize || 75;
      const sidePadding = centerConfig.sidePadding || 20;
      const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      // Start with a base font of 30px
      ctx.font = `20px ${fontStyle}`;

      // Get the width of the string and also
      // the width of the element minus 10 to give it 5px side padding
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let { minFontSize } = centerConfig;
      const lineHeight = centerConfig.lineHeight || 25;
      let wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = `${fontSizeToUse}px ${fontStyle}`;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      const words = txt.split(' ');
      let line = '';
      const lines = [];

      // Break words up into multiple lines if necessary
      for (let n = 0; n < words.length; n += 1) {
        const testLine = `${line + words[n]} `;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = `${words[n]} `;
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (let n = 0; n < lines.length; n += 1) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }

      // Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  }
};

export const barArbitraryCustomPlugin = {
  id: 'barArbitrary',
  beforeDraw(chart: any, _args: any, options: any) {
    const {
      ctx,
      chartArea: {
        top, right, bottom, left,
        width, height
      },
      scales: { x, y }
    } = chart;
    ctx.save();

    ctx.strokeStyle = options.lineColor;
    /**
     * x0: staring point on the horizontal line, left/right
     * y0: staring point on the vertical line, top/bottom
     * x1: length of the horizontal line, left/right
     * y1: length of the vertical line, top/bottom
     */
    ctx.strokeRect(y.getPixelForValue(4), top, 0, height);

    console.log({ right }, { left }, { width }, { bottom }, { y, x }, y.getPixelForValue(1));

    ctx.restore();
  }
};

export const htmlLegendPiePlugin = {
  id: 'htmlLegend',
  afterUpdate(chart: any, args: any, opts: any) {
    const ul = getOrCreateLegendList(chart, opts.containerID);

    if (!ul) return;
    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    items.forEach((item: any, idx: any) => {
      const li = document.createElement('li');
      li.classList.add('o-chart_legendCustom_item');

      li.onclick = () => {
        const chartConfig = chart.config;
        if (chartConfig.type === 'pie') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add('o-chart_legendCustom_box');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = `${item.lineWidth}px`;

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text1 = document.createTextNode(`${item.text}: ${opts.value[idx]}%`);
      const text2 = document.createTextNode(`${item.text}`);
      if (opts.modify === 'tableShare') {
        textContainer.appendChild(text2);
      } else textContainer.appendChild(text1);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};
export const htmlLegendPiePlugin2 = {
  id: 'htmlLegend',
  afterUpdate(chart: any, args: any, opts: any) {
    const ul = getOrCreateLegendList(chart, opts.containerID, opts.title);

    if (!ul) return;
    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    items.forEach((item: any, idx: number) => {
      const li = document.createElement('li');
      li.classList.add('o-chart_legendCustom_item');

      li.onclick = () => {
        const chartConfig = chart.config;
        if (chartConfig.type === 'pie') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add('o-chart_legendCustom_box');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = `${item.lineWidth}px`;

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(`${item.text}: ${opts.value[idx]}`);

      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

export const saleVolumeChartPluginCustom = {
  id: 'htmlLegend',
  afterUpdate(chart: any, _: any, opts: any) {
    const ul = getOrCreateLegendList(chart, opts.containerID);

    if (!ul) return;
    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    items.forEach((item: any) => {
      const li = document.createElement('li');
      li.classList.add('o-chart_legendCustom_items');

      li.onclick = () => {
        const chartConfig = chart.config;

        if (chartConfig.type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add('o-chart_legendCustom_box');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = `${item.lineWidth}px`;

      // Text
      const textContainer = document.createElement('span');
      const wrapper = document.createElement('div');
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);

      textContainer.appendChild(text);
      wrapper.appendChild(textContainer);

      li.appendChild(boxSpan);
      li.appendChild(wrapper);
      ul.appendChild(li);
    });
  },
};

export default htmlLegendGeneralPlugin;
