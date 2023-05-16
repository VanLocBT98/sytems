import { Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useMemo } from 'react';

export type ColumnRawTypes = {
  name: string | React.ReactNode;
  code: string;
  disabled?: boolean;
};

interface Arg {
  columns: ColumnsType<any>;
}

interface ProvidierInterface {
  children: (arg: Arg) => React.ReactNode;
  columnRaw?: {
    sku: ColumnRawTypes[];
    gift: ColumnRawTypes[];
  };
}

const Provider: React.FC<ProvidierInterface> = ({ children, columnRaw }) => {
  const skuColumn = useMemo(() => (columnRaw ? columnRaw.sku.map((v) => ({
    title: v.name,
    dataIndex: v.code,
    key: v.code,
    width: 140,
  })) : []), [columnRaw]);

  const giftColumn = useMemo(() => (columnRaw ? columnRaw.gift.map((v) => ({
    title: v.name,
    dataIndex: v.code,
    key: v.code,
    width: 140,
  })) : []), [columnRaw]);

  const columns: ColumnsType<any> = [
    // Outlet ID
    {
      title: 'Outlet ID',
      dataIndex: 'outletId',
      key: 'outletId',
      width: 120,
      fixed: true,
    },
    // Nhân sự
    // {
    //   title: 'Nhân sự',
    //   dataIndex: 'hr',
    //   key: 'hr',
    //   width: 140,
    // },
    // Outlet Name
    {
      title: 'Outlet Name',
      dataIndex: 'outletName',
      key: 'outletName',
      width: 200,
    },
    // BU
    {
      title: 'BU',
      dataIndex: 'bu',
      key: 'bu',
      width: 200,
    },
    // Region
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      width: 148,
    },
    // Province
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
      width: 148,
    },
    // Area
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      width: 120,
    },
    // District
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      width: 148,
    },
    // Wards
    {
      title: 'Wards',
      dataIndex: 'ward',
      key: 'ward',
      width: 148,
    },
    // Address
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 220,
    },
    // Channel
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      width: 120,
    },
    // Outlet Type
    {
      title: 'Outlet Type',
      dataIndex: 'outletType',
      key: 'outletType',
      width: 140,
    },
    // Activities Type
    {
      title: 'Activities Type',
      dataIndex: 'activitiesType',
      key: 'activitiesType',
      width: 140,
    },
    // Date
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    // Working Time
    {
      title: 'Working Time',
      dataIndex: 'workingTime',
      key: 'workingTime',
      width: 140,
    },
    // ----------------SKU START----------------
    ...skuColumn,
    // ----------------SKU END----------------

    // Số bàn quán set up
    {
      title: 'Số bàn quán set up',
      dataIndex: 'numTableSetup',
      key: 'numTableSetup',
      width: 140,
    },
    // Brand Tables
    {
      title: 'Brand Tables',
      dataIndex: 'brandTables',
      key: 'brandTables',
      width: 140,
    },
    // HVN Tables
    {
      title: 'HVN Tables',
      dataIndex: 'hvnTables',
      key: 'hvnTables',
      width: 140,
    },
    // Competitor
    {
      title: 'Competitor',
      dataIndex: 'competitor',
      key: 'competitor',
      width: 140,
    },
    // Other
    {
      title: 'Other',
      dataIndex: 'other',
      key: 'other',
      width: 140,
    },
    // Số bàn có khách
    {
      title: <Typography.Text style={{ color: '#FF4D4F' }}> Số bàn có khách</Typography.Text>,
      dataIndex: 'tablesHasGuest',
      key: 'tablesHasGuest',
      width: 140,
    },
    // No. of tables play game "Dzo bản lĩnh"
    {
      title: (
        <Typography.Text style={{ color: '#FF4D4F' }}>
          No.of tables
          <br />
          play game
          <br />
          &ldquo;Dzo bản lĩnh&rdquo;

        </Typography.Text>
      ),
      dataIndex: 'tablesGame',
      key: 'tablesGame',
      width: 140,
    },
    ...giftColumn,
    // Comment
    {
      title: <Typography.Text style={{ color: '#FF4D4F' }}> Field comment</Typography.Text>,
      dataIndex: 'comment',
      key: 'comment',
      width: 140,
    },
  ];
  return (
    <>
      {children({
        columns,
      })}
    </>
  );
};

export default Provider;
