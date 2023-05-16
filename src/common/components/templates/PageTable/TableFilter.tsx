/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BugTwoTone, CloseOutlined, DownloadOutlined, SearchOutlined
} from '@ant-design/icons';
import {
  Button, DatePicker, Input, Select, Space
} from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import Form from 'common/components/organisms/Form';
import { DATE_FORMAT } from 'common/utils/constants';

export type TableFilterFormTypes = {
  [nameField: string]: string;
  date: any;
};

export type FilterFieldTypes = {
  name: string;
  options?: OptionsType[];
  placeHolder?: string;
  type: 'text' | 'select' | 'daterange' | 'number';
  defaultValue?: any;
};

export interface TableFilterProps {
  filterFields?: FilterFieldTypes[];
  onSubmit: (data: TableFilterFormTypes) => void;
  method: UseFormReturn<TableFilterFormTypes>;
  exportLoading?: boolean;
  handleResetFilter?: () => void;
  handleExport?: () => void;
}
const { RangePicker } = DatePicker;
const { Option } = Select;

const TableFilterv2: React.FC<TableFilterProps> = ({
  filterFields,
  exportLoading,
  onSubmit,
  method,
  handleResetFilter,
  handleExport
}) => {
  const filterContentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={filterContentRef}
      className="t-pageTable_filter"
    >
      <Form method={method} submitForm={onSubmit}>
        <Space size={16}>
          {filterFields && filterFields.map((item, idx) => {
            switch (item.type) {
              case 'select':
                return (
                  <Controller
                    key={`${idx.toString()}`}
                    name={item?.name}
                    control={method.control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={item?.placeHolder}
                        dropdownStyle={{ minWidth: '12.5rem' }}
                      >
                        {item?.options
                          && item.options.map((val, i) => (
                            <Option
                              value={val.value}
                              key={`item-${i.toString()}`}
                            >
                              {val.label}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                );
              case 'daterange':
                if (item.defaultValue) method.setValue('date', [moment(item.defaultValue[0]), moment(item.defaultValue[1])]);
                return (
                  <Controller
                    key={`${idx.toString()}`}
                    name="date"
                    control={method.control}
                    render={({ field }) => (
                      <RangePicker
                        allowClear
                        onChange={field.onChange}
                        defaultValue={item.defaultValue
                          && [moment(item.defaultValue[0]), moment(item.defaultValue[1])]}
                        value={field.value}
                        format={DATE_FORMAT}
                        ranges={{
                          'Hôm nay': [moment(), moment()],
                          'Tuần này': [
                            moment().startOf('week'),
                            moment().endOf('week'),
                          ],
                          'Tháng này': [
                            moment().startOf('month'),
                            moment().endOf('month'),
                          ],
                          'Quý này': [
                            moment().quarter(moment().quarter()).startOf(
                              'quarter',
                            ),
                            moment().quarter(moment().quarter()).endOf(
                              'quarter',
                            ),
                          ],
                        }}
                      />
                    )}
                  />
                );

              default:
                return (
                  <Controller
                    key={`${idx.toString()}`}
                    name={item?.name}
                    control={method.control}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        type={item.type}
                        onChange={field.onChange}
                        placeholder={item?.placeHolder}
                      />
                    )}
                  />
                );
            }
          })}
          <Button
            htmlType="submit"
            icon={<SearchOutlined />}
            className="flex crayola"
          >
            Lọc
          </Button>
          <Button
            icon={<CloseOutlined />}
            style={{ width: '100%' }}
            className="flex gainsboro"
            onClick={handleResetFilter}
          >
            Làm mới
          </Button>
          <Button
            loading={exportLoading}
            icon={<DownloadOutlined />}
            style={{ width: '100%' }}
            onClick={handleExport}
            className="laSalleGreen"
          >
            Export
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default TableFilterv2;
