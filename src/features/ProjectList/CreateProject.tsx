/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button, DatePicker, Input, Select, Space, Typography
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ErrorBox from 'common/components/molecules/ErrorBox';
import Form from 'common/components/organisms/Form';
import { DATE_FORMAT } from 'common/utils/constants';
import { createProjectSchema } from 'common/utils/schemas';

export type CreateProjectFormTypes = {
  projectName: string;
  channel: string;
  brand: string;
  kickoffDate: string;
  endingDate: string;
  kpi: number;
  budget: number;
  activation: number
};

interface CreateProjectProps {
  onCancel?: () => void;
  onSubmit?: (data: CreateProjectFormTypes) => void;
  channelOptions: OptionsType[];
  brandOptions: OptionsType[];
}
const { Option } = Select;
const CreateProject: React.FC<CreateProjectProps> = ({
  onCancel, onSubmit, channelOptions, brandOptions
}) => {
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const method = useForm<CreateProjectFormTypes>({
    resolver: yupResolver(createProjectSchema),
    defaultValues: {
      projectName: '',
      channel: channelOptions[0].value,
      brand: brandOptions[0].value,
      kickoffDate: moment().toISOString(),
      endingDate: moment().toISOString(),
    }
  });
  /**
 * Submit Handler
 */
  const handleSubmit = (data: CreateProjectFormTypes) => {
    const convertData: CreateProjectFormTypes = {
      ...data,
      kickoffDate: moment(data.kickoffDate).toISOString(),
      endingDate: moment(data.endingDate).toISOString(),
    };
    if (onSubmit) onSubmit(convertData);
    method.reset();
  };

  /**
 * Error rendering
 */
  useEffect(() => {
    if (Object.keys(method.formState.errors).length > 0) {
      const res = Object.entries(method.formState.errors).map(([, v]) => ({
        message: v.message || ''
      }));
      setErrors(res);
    } else setErrors([]);
  }, [method.formState.errors]);
  return (
    <div className="p-projectList_createProject">
      <Form method={method} submitForm={handleSubmit}>
        <Space direction="vertical" style={{ width: '100%', flexDirection: 'column' }} size={20}>
          <Typography.Title level={5} style={{ color: '#007125' }}>
            Thông tin chung
          </Typography.Title>
          {
            errors && errors.length > 0
            && <ErrorBox errors={errors} />
          }
          <Controller
            name="projectName"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Tên dự án *
                </Typography.Text>
                <Input
                  {...field}
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập tên dự án"
                  autoComplete="off"
                  style={{ marginTop: 8 }}
                />
              </>
            )}
          />
          <Controller
            name="channel"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Chanel *
                </Typography.Text>
                <Select
                  {...field}
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  placeholder="Chọn chanel"
                  onChange={field.onChange}
                  style={{ width: '100%', marginTop: 8 }}
                >
                  {
                    channelOptions.map((v, i) => (
                      <Option
                        key={`option-${i.toString()}`}
                        value={v.value}
                      >
                        {v.label}
                      </Option>
                    ))
                  }
                </Select>
              </>
            )}
          />
          <Controller
            name="brand"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Brand *
                </Typography.Text>
                <Select
                  {...field}
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  placeholder="Chọn brand"
                  onChange={field.onChange}
                  style={{ width: '100%', marginTop: 8 }}
                >
                  {
                    brandOptions.map((v, i) => (
                      <Option
                        key={`option-${i.toString()}`}
                        value={v.value}
                      >
                        {v.label}
                      </Option>
                    ))
                  }
                </Select>
              </>
            )}
          />
          <Controller
            name="kickoffDate"
            control={method.control}
            render={({ field }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Kickoff Date *
                </Typography.Text>
                <DatePicker
                  value={moment(field.value)}
                  onChange={field.onChange}
                  placeholder="Chọn ngày kickoff"
                  defaultValue={moment()}
                  format={DATE_FORMAT}
                  style={{ width: '100%', marginTop: 8 }}
                />
              </>
            )}
          />
          <Controller
            name="endingDate"
            control={method.control}
            render={({ field }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Ending date *
                </Typography.Text>
                <DatePicker
                  value={moment(field.value)}
                  onChange={field.onChange}
                  placeholder="Chọn ngày ending"
                  defaultValue={moment()}
                  format={DATE_FORMAT}
                  style={{ width: '100%', marginTop: 8 }}
                />
              </>
            )}
          />
          <Typography.Title level={5} style={{ color: '#007125' }}>
            Planning
          </Typography.Title>
          <Controller
            name="kpi"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  KPI quy định
                </Typography.Text>
                <Input
                  {...field}
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập KPI"
                  autoComplete="off"
                  style={{ marginTop: 8 }}
                />
              </>
            )}
          />
          <Controller
            name="budget"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Budget theo contract
                </Typography.Text>
                <Input
                  {...field}
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Budget"
                  autoComplete="off"
                  style={{ marginTop: 8 }}
                />
              </>
            )}
          />
          <Controller
            name="activation"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Số Activation
                </Typography.Text>
                <Input
                  {...field}
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Activation"
                  autoComplete="off"
                  style={{ marginTop: 8 }}
                />
              </>
            )}
          />
        </Space>
        <Space size={16} style={{ width: '100%', justifyContent: 'flex-end', marginTop: 32 }}>
          <Button
            className="flex antiFlashWhite noBorder"
            onClick={() => {
              method.reset();
              if (onCancel) onCancel();
            }}
            icon={<CloseOutlined />}
          >
            Huỷ
          </Button>
          <Button
            htmlType="submit"
            className="flex crayola"
            icon={<CheckOutlined />}
          >
            Xác nhận
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default CreateProject;
