import { Empty, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Filtering, { ProjectOverviewFormTypes } from './Filtering';
import TableChart from './TableChart';
import TableChartProvider, {
  FilterType
} from './provider';

import { useAppSelector } from 'app/store';
import ChartCustom from 'common/components/organisms/Chart';
import ContentOverview from 'common/components/templates/ContentOverview';
import {
  getGiftAllocationService, getProjectProgressService,
  getTableShareService
} from 'common/services/trackings';
import { FilterParamsTypes, GiftAllocationDataTypes } from 'common/services/trackings/types';
import { htmlLegendPiePlugin2 } from 'common/utils/chart';
import {
  formatDateDDMMYYYY
} from 'common/utils/functions';

const ProjectOverview: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>();
  const [totalPlan, setTotalPlan] = useState<string>('');
  const { projectInfo: projectInfoData } = useAppSelector((state) => state.tracking);

  // PROJECT PROGRESS DATA
  const { data: projectProgressApiData, isLoading: progressProjectLoding } = useQuery(
    ['getProjectProgress', filter],
    () => {
      let params: FilterParamsTypes = {};
      if (!filter) return getProjectProgressService();

      if (filter.dateRange) {
        params = {
          ...params,
          fromDate: formatDateDDMMYYYY(filter.dateRange[0]),
          toDate: formatDateDDMMYYYY((filter.dateRange[1])),
        };
      }
      if (filter.region) {
        params = {
          ...params,
          provinceCode: filter.region || '',
        };
      }
      return getProjectProgressService(params);
    },
  );

  // TABLE SHARE DATA
  const { data: tableShareData, isLoading: tableShareLoading } = useQuery(
    ['getTableShare', filter],
    () => {
      let params: FilterParamsTypes = {};
      if (!filter) return getTableShareService();

      if (filter.dateRange) {
        params = {
          ...params,
          fromDate: formatDateDDMMYYYY(filter.dateRange[0]),
          toDate: formatDateDDMMYYYY((filter.dateRange[1])),
        };
      }
      if (filter.region) {
        params = {
          ...params,
          provinceCode: filter.region || '',
        };
      }
      return getTableShareService(params);
    },
  );

  // GIFT ALLOCATION DATA
  const { data: giftAllocationApiData, isLoading: giftAllocationLoading } = useQuery(
    ['getGiftAllocation', filter],
    () => {
      let params: FilterParamsTypes = {};
      if (!filter) return getGiftAllocationService();

      if (filter.dateRange) {
        params = {
          ...params,
          fromDate: formatDateDDMMYYYY(filter.dateRange[0]),
          toDate: formatDateDDMMYYYY((filter.dateRange[1])),
        };
      }
      if (filter.region) {
        params = {
          ...params,
          provinceCode: filter.region || '',
        };
      }
      return getGiftAllocationService(params);
    },
    {
      enabled: Boolean(projectInfoData),
      onSuccess(data: GiftAllocationDataTypes) {
        setTotalPlan(data?.allocation.toFixed(0));
      },
    },
  );

  // Rendering Title for only this above case
  useEffect(() => {
    const collection = document.getElementsByClassName(
      'o-chart_legendCustom_title',
    );
    if (totalPlan && collection.length <= 1) {
      const text = document.createTextNode(
        `Total plan = ${totalPlan} gifts/activation`,
      );
      collection[0]?.appendChild(text);
    }
  }, [totalPlan]);

  /**
   * Submit Filter
   */
  const submitFilter = (data: ProjectOverviewFormTypes) => {
    // if (projectInfoData && !data.date) {
    //   setFilter((prev) => ({
    //     ...prev,
    //     dateRange: [formatDateDDMMYYYY(projectInfoData?.start),
    //       formatDateDDMMYYYY(projectInfoData?.end)]
    //   }));
    // }
    if (data.date) {
      setFilter((prev) => ({
        ...prev,
        dateRange: [data.date[0], data.date[1]]
      }));
    }

    if (data.region) {
      setFilter((prev) => ({
        ...prev,
        region: data.region
      }));
    }
    if (!data.date && !data.region) {
      setFilter(undefined);
    }
  };

  return (
    <Spin spinning={false}>
      <div className="p-projectOverview">
        {/* INTRO  */}
        <TableChartProvider
          projectProgress={projectProgressApiData}
          tableShareData={tableShareData}
          pieGiftAllocationData={giftAllocationApiData}
        >
          {({
            columns,
            tableShareColumns,
            tableShare,
            giftAllocationData,
            projectProgressData
          }) => (
            <ContentOverview
              title="MOC PROJECT"
              date={projectInfoData ? [projectInfoData.start, projectInfoData.end] : []}
              location={projectInfoData?.provinces}
              isGrid
              sideFilter={
                <Filtering onFilter={submitFilter} onClearFilter={() => setFilter(undefined)} />
              }
            >
              <TableChart
                title="PROJECT PROGRESS"
                isLoading={progressProjectLoding}
                table={projectProgressData.table.length > 0 ? (
                  <Table
                    columns={columns}
                    dataSource={projectProgressData.table}
                    pagination={false}
                  />
                ) : <Empty />}
                chart={projectProgressData.chart ? (
                  <ChartCustom
                    width={200}
                    height={400}
                    type="bar"
                    data={projectProgressData.chart}
                    options={projectProgressData.chartConfig}
                  />
                ) : <Empty />}
              />
              <TableChart
                title="TABLE SHARE per ACTIVATION"
                isLoading={tableShareLoading}
                table={tableShare.table.length > 0 ? (
                  <Table
                    dataSource={tableShare.table}
                    pagination={false}
                    showHeader={false}
                    columns={tableShareColumns}
                    className="sideBg"
                    style={{ width: '100%' }}
                  />
                ) : <Empty />}
                chart={tableShare.chart ? (
                  <ChartCustom
                    type="pie"
                    legendCustomId="pie-legend-container"
                    data={tableShare.chart}
                    options={tableShare.chartConfig}
                  />
                ) : null}
              />
              <TableChart
                title="GIFT ALLOCATION per ACTIVATION"
                isLoading={giftAllocationLoading}
                // totalPlan={totalPlan}
                chart={giftAllocationData.chart ? (
                  <ChartCustom
                    type="pie"
                    customClass="giftAll"
                    legendCustomId="pie-legend-giftAllocation"
                    data={giftAllocationData.chart}
                    options={giftAllocationData.chartConfig}
                    customPlugin={htmlLegendPiePlugin2}
                  />
                ) : <Empty />}
              />
            </ContentOverview>
          )}
        </TableChartProvider>
      </div>
    </Spin>
  );
};

export default ProjectOverview;
