import {
  Menu, Modal, Select, Space, Spin, Typography
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useContext, useEffect, useState } from 'react';

import CreateProject, { CreateProjectFormTypes } from './CreateProject';

import channelOptionsDummy, {
  brandOptionsDummy,
} from 'common/assets/dummy/options';
import statusOptionsDummy from 'common/assets/dummy/system';
import agencyInfoDataDummy from 'common/assets/dummy/table';
import Icon from 'common/components/atoms/Icon';
import { LayoutContext } from 'common/components/templates/MainLayout/context';
import PageTable from 'common/components/templates/PageTable';
import { FilterFieldTypes } from 'common/components/templates/PageTable/TableFilter';

export type ProjectInfoTypes = {
  projectCode: string;
  projectName: string;
  channel: string;
  brand: string;
  agency: string;
  productOwner: string;
  kickoffDate: string;
  endingDate: string;
  updatedAt: string;
  status: number;
  id: number;
};

const statusColorRender = (id: number) => {
  switch (id) {
    case 0:
      return 'finished';
    case 1:
      return 'running';
    case 2:
      return 'cancelled';
    default:
      return '';
  }
};

const ProjectList: React.FC = () => {
  const { setTitle } = useContext(LayoutContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
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
  const columns: ColumnsType<ProjectInfoTypes> = [
    // Mã dự án
    {
      title: 'Mã dự án',
      dataIndex: 'projectCode',
      key: 'projectCode',
      width: 120,
      fixed: true,
    },
    // Tên dự án
    {
      title: 'Tên dự án',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 120,
    },
    // Channel
    {
      title: 'Chanel',
      dataIndex: 'channel',
      key: 'channel',
      width: 120,
    },
    // Brand
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      width: 120,
    },
    // Agency
    {
      title: 'Agency',
      dataIndex: 'agency',
      key: 'agency',
      width: 120,
    },
    // Product Owner
    {
      title: 'Product Owner',
      dataIndex: 'productOwner',
      key: 'productOwner',
      width: 120,
    },
    // Kickoff Date
    {
      title: 'Kickoff date',
      dataIndex: 'kickoffDate',
      key: 'kickoffDate',
      width: 120,
    },
    // Ending Date
    {
      title: 'Ending date',
      dataIndex: 'endingDate',
      key: 'endingDate',
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
      render: (_name: number, dt: ProjectInfoTypes) => (
        <div className={`p-projectList_status ${statusColorRender(dt.status)}`}>
          <Select
            defaultValue={String(dt.status)}
            bordered={false}
            style={{ width: 150 }}
          >
            {statusOptionsDummy.map((val, idx) => (
              <Select.Option value={val.value} key={`option-${idx.toString()}`}>
                {val.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];
  /**
   *  FILTER FIELDs
   */
  const filter: FilterFieldTypes[] = [{
    name: 'status',
    placeHolder: 'Trạng thái',
    type: 'select',
    options: [
      {
        label: 'Đã hoàn thành',
        value: 'done',
      },
      {
        label: 'Đang chạy',
        value: 'inProgress',
      },
      {
        label: 'Đã hủy',
        value: 'cancled',
      },
    ],
  }, {
    name: 'agency',
    placeHolder: 'Chọn Agency',
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
    name: 'chanel',
    placeHolder: 'Chọn Channel',
    type: 'select',
    options: [
      {
        label: 'Chanel 1 test',
        value: 'Chanel 1 test val',
      },
      {
        label: 'Chanel 2 test',
        value: 'Chanel 2 test val',
      },
    ],
  }, {
    name: 'brand',
    placeHolder: 'Chọn brand',
    type: 'select',
    options: [
      {
        label: 'Brand 1 test',
        value: 'Brand 1 test val',
      },
      {
        label: 'Brand 2 test',
        value: 'Brand 2 test val',
      },
    ],
  }, {
    name: 'dateRange',
    placeHolder: '',
    type: 'daterange',
  }];
  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetCurrentView = (view: number) => {
    setCurrentView(view);
  };

  const handleSubmitCreate = (data: CreateProjectFormTypes) => {
    console.log(data);
    setOpenPopup(false);
  };

  useEffect(() => {
    if (setTitle) setTitle('Quản lý dự án');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Spin spinning={false}>
        <div className="p-projectList">
          <PageTable
            tableProps={{
              editMenu,
              data: agencyInfoDataDummy,
              currentPage,
              columns,
              pageSize: currentView,
              handleSetCurrentPage,
              handleSetCurrentView,
            }}
            filterFields={filter}
            submitFilter={(data: any) => console.log(data)}
            handleCreateNew={() => setOpenPopup(true)}
          />
        </div>
      </Spin>

      {/* CREATE PROJECT MODAL  */}
      <Modal
        visible={openPopup}
        width={440}
        maskClosable={false}
        className="p-projectList_modal"
        bodyStyle={{
          overflow: 'auto',
          maxHeight: 'calc(100% - 3.375rem)',
        }}
        onCancel={() => {
          setOpenPopup(false);
        }}
        title={(
          <Typography.Title level={5} style={{ color: '#090A0A' }}>
            Tạo dự án
          </Typography.Title>
        )}
        footer={null}
      >
        <CreateProject
          onCancel={() => setOpenPopup(false)}
          onSubmit={handleSubmitCreate}
          channelOptions={channelOptionsDummy}
          brandOptions={brandOptionsDummy}
        />
      </Modal>
    </>
  );
};

export default ProjectList;
