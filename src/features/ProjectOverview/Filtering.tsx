/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Button, DatePicker, Select, Space
} from 'antd';
import Typography from 'antd/lib/typography';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppSelector } from 'app/store';
import Form from 'common/components/organisms/Form';
import { Provinces } from 'common/services/trackings/types';
import { DATE_FORMAT } from 'common/utils/constants';
import { formatDateDDMMYYYY } from 'common/utils/functions';

const { Option } = Select;
const { RangePicker } = DatePicker;

export type ProjectOverviewFormTypes = {
  region: string;
  date: any;
};

export type FilteringPropTypes = {
  onFilter: (data: ProjectOverviewFormTypes) => void;
  onClearFilter?: () => void;
};
const Filtering: React.FC<FilteringPropTypes> = (
  { onFilter, onClearFilter },
) => {
  const { projectInfo } = useAppSelector((state) => state.tracking);
  const [region, setRegion] = useState<Provinces[]>();
  const method = useForm<ProjectOverviewFormTypes>({
    defaultValues: {},
  });

  useEffect(() => {
    // method.setValue(
    //   'date',
    //   [
    //     moment(projectInfo?.start),
    //     moment(projectInfo?.end),
    //   ],
    // );
    if (!projectInfo) return;
    setRegion(projectInfo.provinces);
  }, [method, projectInfo]);

  const handleClearFilter = () => {
    method.reset();
    // Un Comment below to set Range picker to default Value
    // method.setValue(
    //   'date',
    //   [
    //     moment(projectInfo?.start),
    //     moment(projectInfo?.end),
    //   ],
    // );
    if (onClearFilter) onClearFilter();
  };

  return (
    <div className="p-projectOverview_filter">
      <Space style={{ width: '100%' }} size={12}>
        <Typography.Text
          style={{
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 500,
            color: '#2C3032',
          }}
        >
          Filter:
        </Typography.Text>
        <Form method={method} submitForm={onFilter}>
          <Space style={{ width: '100%' }} size={18}>
            <Controller
              name="region"
              control={method.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Province"
                  style={{ minWidth: 148 }}
                >
                  {region
                    && region.map((val, i) => (
                      <Option
                        value={val.code}
                        key={`item-${i.toString()}`}
                      >
                        {val.name}
                      </Option>
                    ))}
                </Select>
              )}
            />

            <Controller
              name="date"
              control={method.control}
              render={({ field }) => (
                <RangePicker
                  allowClear
                  onChange={field.onChange}
                  // defaultValue={projectInfo
                  //   && [moment(projectInfo.start), moment(projectInfo.end)]}
                  value={field.value}
                  format={DATE_FORMAT}
                />
              )}
            />
            <Button
              // onClick={() => handleFilterConfirm()}
              className="crayola"
              htmlType="submit"
              type="default"
              icon={<CheckOutlined />}
            >
              Lọc
            </Button>
            <Button
              type="default"
              className="antiFlashWhite"
              icon={<CloseOutlined />}
              onClick={handleClearFilter}
            >
              Làm mới
            </Button>
          </Space>
        </Form>
      </Space>
    </div>
  );
};

export default Filtering;
