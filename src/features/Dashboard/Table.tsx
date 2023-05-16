import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useMemo, useState } from 'react';

import { agencyOptionsDummy, yearOptionsDummy } from './dummy';

import ChartPanel from 'common/components/organisms/ChartPanel';

const columns: ColumnsType<AgencyInfoTypes> = [
  {
    title: <div style={{ color: '#4a4a4a', cursor: 'pointer', textAlign: 'center' }}> STT </div>,
    dataIndex: 'order',
    key: 'order',
    width: 50,
    render: (name: string) => (
      <div
        style={{ color: '#4a4a4a', cursor: 'pointer', textAlign: 'center' }}
      >
        {name}
      </div>
    ),
  },
  {
    title: 'Mã dự án',
    dataIndex: 'projectCode',
    key: 'projectCode',
    width: 120,
  },
  {
    title: 'Tên dự án',
    dataIndex: 'projectName',
    key: 'projectName',
    width: 140,
    sorter: {
      compare:
        (a: AgencyInfoTypes, b: AgencyInfoTypes) => a.projectName.localeCompare(b.projectName),
    },
  },
  {
    title: 'Chanel',
    dataIndex: 'channel',
    key: 'channel',
    width: 120,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    width: 150,
  },
  {
    title: 'Agency',
    dataIndex: 'agency',
    key: 'agency',
    width: 150,
  },
  {
    title: 'Product Owner',
    dataIndex: 'productOwner',
    key: 'productOwner',
    width: 150,
  },
  {
    title: 'Kickoff date',
    dataIndex: 'kickoffDate',
    key: 'kickoffDate',
    width: 120,
  },
  {
    title: 'Ending date',
    dataIndex: 'endingDate',
    key: 'endingDate',
    width: 120,
  },
  {
    title: 'Cập nhật lúc',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 120,
  },
];

export type AgencyInfoTypes = {
  projectCode: string;
  projectName: string;
  channel: string;
  brand: string;
  agency: string;
  productOwner: string;
  kickoffDate: string;
  endingDate: string;
  updatedAt: string;
};

export interface DashboardTableProps {
  data: AgencyInfoTypes[];
}

const DashboardTable: React.FC<DashboardTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState(10);
  const convertData = useMemo(() => (data
    ? data.map((val, idx) => ({
      order: idx + 1,
      ...val
    }))
    : []), [data]);
  return (
    <div className="t-dashboardTable">
      <ChartPanel
        label="Thống kê chi tiết"
        agencyOptions={agencyOptionsDummy}
        timeOptions={yearOptionsDummy}
        notCard
      >
        <Table
          scroll={{ x: 1800 }}
          columns={columns}
          dataSource={convertData}
          pagination={{
            position: ['bottomCenter'],
            current: currentPage,
            pageSize: currentView,
            onChange: (page) => setCurrentPage(page),
            onShowSizeChange: (_, size) => setCurrentView(size),
          }}
        />
      </ChartPanel>
    </div>
  );
};

export default DashboardTable;
