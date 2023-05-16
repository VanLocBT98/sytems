/* eslint-disable @typescript-eslint/no-unused-vars */
import { CloseOutlined } from '@ant-design/icons';
import {
  Button, Dropdown, Space, Spin
} from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import TableFilter, {
  FilterFieldTypes,
  TableFilterFormTypes
} from './TableFilter';

import { useAppDispatch, useAppSelector } from 'app/store';
import { updateRawDataFilter } from 'app/systemSlice';
import Icon from 'common/components/atoms/Icon';
import useDebounce from 'common/hooks/useDebounce';
import { GetAllTrackingsParamsTypes } from 'common/services/trackings/types';
import { formatDateDDMMYYYY } from 'common/utils/functions';

interface PageTableProps<T> {
  isLoading?: boolean;
  exportLoading?: boolean;
  tableProps?: {
    columns?: ColumnsType<T>;
    data?: T[];
    total?: number;
    pageSize?: number;
    currentPage?: number;
    noBaseCol?: boolean;
    editMenu?: JSX.Element;
    editMenuConfig?: any;
    isHidePagination?: boolean;
    handleSetCurrentPage?: (page: number) => void;
    handleSetCurrentView?: (view: number) => void;
  };
  filterFields?: FilterFieldTypes[];
  submitFilter?: (data: TableFilterFormTypes) => void;
  handleCreateNew?: () => void;
  onResetFilter?: () => void;
  onExport?: () => void;
}

const PageTable = <T extends any>({
  isLoading = false,
  tableProps,
  handleCreateNew,
  submitFilter,
  filterFields,
  onResetFilter,
  exportLoading,
  onExport
}: PageTableProps<T>) => {
  const dispatch = useAppDispatch();
  const cellAlgnmentObj = { width: '100%', justifyContent: 'center' };
  const method = useForm<TableFilterFormTypes>();

  const outletWatcher = useDebounce(method.watch('outlet'), 500);
  const buWatcher = method.watch('bu');
  const provinceWatcher = method.watch('province');
  const dateWatcher = method.watch('date');
  useEffect(() => {
    let params: GetAllTrackingsParamsTypes = {};
    if (outletWatcher) {
      params = {
        ...params,
        outletCode: Number(outletWatcher)
      };
    }
    if (buWatcher) {
      params = {
        ...params,
        buCode: buWatcher
      };
    }
    if (provinceWatcher) {
      params = {
        ...params,
        provinceCode: provinceWatcher
      };
    }
    if (dateWatcher) {
      params = {
        ...params,
        fromDate: formatDateDDMMYYYY(dateWatcher[0]),
        toDate: formatDateDDMMYYYY(dateWatcher[1])
      };
    }

    dispatch(updateRawDataFilter(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outletWatcher, buWatcher, provinceWatcher, dateWatcher]);

  const columns: ColumnsType<T> = tableProps?.noBaseCol
    ? (tableProps?.columns || [])
    : [
      {
        title: 'STT',
        key: 'order',
        width: 60,
        fixed: true,
        align: 'center',
        render: (_name: string, _data: any, index: number) => (
          <Space direction="horizontal" style={cellAlgnmentObj}>
            {index + 1}
          </Space>
        ),
      },
      ...(tableProps?.columns || []),
      // Status
      {
        key: 'status',
        width: 50,
        align: 'center',
        render: () => (tableProps?.editMenu
          ? (
            <Dropdown
              overlay={tableProps.editMenu}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                type="link"
                icon={<Icon iconName="more" size="20x20" />}
              />
            </Dropdown>
          )
          : null),
        ...tableProps?.editMenuConfig
      },
    ];

  const dataSource = useMemo(
    () => (tableProps?.data
      ? tableProps.data.map((val: any) => ({
        ...val,
        key: val.id.toString(),
      }))
      : []),
    [tableProps?.data],
  );
  const [openFilter, setOpenFilter] = useState(false);

  /**
   * SUBMIT FILTER
   */
  const handleSubmitFilter = (data: TableFilterFormTypes) => {
    if (!submitFilter) return;
    if (data.date && filterFields?.find((item) => item.type === 'daterange')) {
      const daterange = data.date.map((v: any) => formatDateDDMMYYYY(v));
      submitFilter({
        ...data,
        date: daterange,
      });
    } else submitFilter(data);
  };

  /**
   * RESET FILTER
   */
  const handleResetFilter = () => {
    method.reset();
    if (onResetFilter) onResetFilter();
  };
  const handleTotal = (total: number, range: [number, number]): JSX.Element => (
    <span>
      Đang hiển thị
      {' '}
      {range[0].toLocaleString()}
      -
      <span>{range[1].toLocaleString()}</span>
      /
      <span>{total.toLocaleString()}</span>
    </span>
  );
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={16}>
      <Space
        size={16}
        style={{
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >

        {handleCreateNew && (
          <Button
            onClick={handleCreateNew}
            icon={<Icon iconName="add" size="20x20" />}
            style={{ width: '100%' }}
            type="primary"
            className="flex"
          >
            Tạo mới
          </Button>
        )}
      </Space>
      <TableFilter
        filterFields={filterFields}
        method={method}
        onSubmit={handleSubmitFilter}
        handleResetFilter={handleResetFilter}
        handleExport={onExport}
        exportLoading={exportLoading}
      />
      <Spin tip="Đang tải..." spinning={isLoading}>
        <Table
          scroll={{ x: 1800, y: '70vh' }}
          columns={columns}
          size="small"
          dataSource={dataSource}
          sticky
          pagination={{
            position: ['bottomCenter'],
            pageSize: tableProps?.pageSize,
            showSizeChanger: true,
            onChange: (page) => {
              if (tableProps?.handleSetCurrentPage) {
                tableProps.handleSetCurrentPage(page);
              }
            },
            onShowSizeChange: (_, size) => {
              if (tableProps?.handleSetCurrentView) {
                tableProps.handleSetCurrentView(size);
              }
            },
            total: tableProps?.total,
            current: tableProps?.currentPage,
            hideOnSinglePage: tableProps?.isHidePagination,
            showTotal: handleTotal,
          }}
        />
      </Spin>
    </Space>
  );
};

PageTable.defaultProps = {
  children: undefined,
};

export default PageTable;
