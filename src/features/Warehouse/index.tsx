import {
  Menu, Space, Spin, Typography
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useContext, useEffect, useState } from 'react';

import { warehouseInfoDataDummy } from 'common/assets/dummy/table';
import Icon from 'common/components/atoms/Icon';
import Image from 'common/components/atoms/Image';
import { LayoutContext } from 'common/components/templates/MainLayout/context';
import PageTable from 'common/components/templates/PageTable';
import { FilterFieldTypes } from 'common/components/templates/PageTable/TableFilter';

export type WarehouseInfoTypes = {
  projectName: string;
  agency: string;
  located: string;
  category: string;
  itemName: string;
  quantity: number;
  unitLabel: string;
  itemStatus: string;
  itemPicSrc: string;
  remark: string;
  createdDate: string;
  updatedAt: string;
  status: string;
  id: number;
};

const Warehouse: React.FC = () => {
  const { setTitle } = useContext(LayoutContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState(10);

  const editMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Space size={12}>
              <Icon iconName="eye" size="20x20" />
              <Typography.Text style={{ color: '#285FFA', fontWeight: 500 }}>
                Xem
              </Typography.Text>
            </Space>
          ),
        },
        {
          key: '2',
          label: (
            <Space size={12}>
              <Icon iconName="trash" size="20x20" />
              <Typography.Text style={{ color: '#FF4D4F', fontWeight: 500 }}>
                Xoá
              </Typography.Text>
            </Space>
          ),
        },
        {
          key: '3',
          label: (
            <Space size={12}>
              <Icon iconName="editYellow" size="20x20" />
              <Typography.Text style={{ color: '#FEC400', fontWeight: 500 }}>
                Sửa
              </Typography.Text>
            </Space>
          ),
        },
      ]}
    />
  );

  /**
   * COLUMN INITIAL
   */
  const columns: ColumnsType<WarehouseInfoTypes> = [
    // Tên dự án
    {
      title: 'Tên dự án',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 120,
      fixed: true,
    },
    // Agency
    {
      title: 'Agency',
      dataIndex: 'agency',
      key: 'agency',
      width: 140,
    },
    // Located
    {
      title: 'Located',
      dataIndex: 'located',
      key: 'located',
      width: 120,
    },
    // Category
    {
      title: 'Phân loại',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    // Item
    {
      title: 'Item',
      dataIndex: 'itemName',
      key: 'itemName',
      width: 120,
    },
    // quantity
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
    },
    // unit label
    {
      title: 'Đơn vị',
      dataIndex: 'unitLabel',
      key: 'unitLabel ',
      width: 100,
    },
    // status
    {
      title: 'Hiện trạng',
      dataIndex: 'itemStatus',
      key: 'itemStatus',
      width: 150,
    },
    // item picture
    {
      title: 'Pic',
      dataIndex: 'itemPicture',
      key: 'itemPicture',
      width: 70,
      render: (_name: number, dt: WarehouseInfoTypes) => (
        <div className="p-warehouse_pictureCell">
          <Image src={dt.itemPicSrc} ratio="1x1" />
        </div>
      ),
    },
    // remark
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      width: 120,
    },
    // Cập nhật
    {
      title: 'Cập nhật lúc',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 120,
    },
    // Trạng thái
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
  ];

  /**
   *  FILTER FIELDs
   */
  const filter: FilterFieldTypes[] = [{
    name: 'keywork',
    placeHolder: 'Từ khoá',
    type: 'text',
  }, {
    name: 'status',
    placeHolder: 'Trạng thái',
    type: 'select',
    options: [
      {
        label: 'Option 1 test',
        value: 'Option 1 test val',
      },
      {
        label: 'Option 2 test',
        value: 'Option 2 test val',
      },
    ],
  }, {
    name: 'agency',
    placeHolder: 'Agency',
    type: 'select',
    options: [
      {
        label: 'Agency 1 test',
        value: 'Agency 1 test val',
      },
      {
        label: 'Agency 2 test',
        value: 'Agency 2 test val',
      },
    ],
  }, {
    name: 'type',
    placeHolder: 'Phân loại',
    type: 'select',
    options: [
      {
        label: 'Type 1 test',
        value: 'Type 1 test val',
      },
      {
        label: 'Type 2 test',
        value: 'Type 2 test val',
      },
    ],
  }, {
    name: 'location',
    placeHolder: 'Located',
    type: 'select',
    options: [
      {
        label: 'Located 1 test',
        value: 'Located 1 test val',
      },
      {
        label: 'Located 2 test',
        value: 'Located 2 test val',
      },
    ],
  }];
  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetCurrentView = (view: number) => {
    setCurrentView(view);
  };

  useEffect(() => {
    if (setTitle) setTitle('Quản lý kho');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spin spinning={false}>
      <div className="p-warehouse">
        <PageTable
          tableProps={{
            editMenu,
            data: warehouseInfoDataDummy,
            currentPage,
            columns,
            pageSize: currentView,
            handleSetCurrentPage,
            handleSetCurrentView,
          }}
          filterFields={filter}
          submitFilter={(data: any) => console.log(data)}
        />
      </div>
    </Spin>
  );
};

export default Warehouse;
