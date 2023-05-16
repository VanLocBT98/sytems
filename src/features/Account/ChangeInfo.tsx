import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
 Button, Input, Space, Typography
} from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Controller, UseFormReturn, useWatch } from 'react-hook-form';

import { useAppSelector } from 'app/store';
import ErrorBox from 'common/components/molecules/ErrorBox';
import Form from 'common/components/organisms/Form';

export interface ChangeInfoRef {
  reset(): void;
}
interface ChangeInfoProps {
  formData?: ChangeInfoFormTypes;
  activeForm?: boolean;
  onCancel?: () => void;
  onSubmit?: (data: ChangeInfoFormTypes) => void;
  method: UseFormReturn<ChangeInfoFormTypes>;
  errors?: ErrorResponse[];
  isLoading?: boolean | undefined
}

export type ChangeInfoFormTypes = {
  password?: string;
  name: string;
  email: string;
  phone: string;
  phonePrefix: string;
};

const ChangeInfo = forwardRef<ChangeInfoRef, ChangeInfoProps>(({
  onCancel,
  onSubmit,
  method,
  errors,
  isLoading
}, ref) => {
  const userProfile = useAppSelector((state) => state.auth);
 const fieldVals = useWatch({ control: method.control });

  useImperativeHandle(ref, () => ({
    reset() {
      method.reset();
    },
  }));

  const handleSubmit = (data: ChangeInfoFormTypes) => {
    if (onSubmit) onSubmit(data);
    // method.reset();
  };
// Check if data input is different from current data
  const isDataUpdated = (): boolean => {
    if (fieldVals.name?.trim() === userProfile.data?.name
    && fieldVals.email?.trim() === userProfile.data?.email
    && fieldVals.phone?.trim() === userProfile.data?.phone) { return false; }
    return true;
  };

  useEffect(() => {
    method.setValue('name', userProfile.data?.name || '');
    method.setValue('email', userProfile.data?.email || '');
    method.setValue('phone', userProfile.data?.phone || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <div className="t-changeInfo">
      <Form method={method} submitForm={handleSubmit}>
        <Space
          direction="vertical"
          style={{ width: '100%', flexDirection: 'column' }}
          size={20}
        >
          {errors && errors.length > 0
            && <ErrorBox errors={errors} />}
          <Controller
            name="name"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Họ và tên
                </Typography.Text>
                <Input
                  {...field}
                  size="large"
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Họ và tên"
                  autoComplete="off"
                  style={{ marginTop: 8, color: '#2F3437', fontWeight: 500 }}
                />
              </>
            )}
          />
          <Controller
            name="email"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Email
                </Typography.Text>
                <Input
                  {...field}
                  size="large"
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Email"
                  autoComplete="off"
                  style={{ marginTop: 8, color: '#2F3437', fontWeight: 500 }}
                />
              </>
            )}
          />
          <Controller
            name="phone"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Số điện thoại
                </Typography.Text>
                <Input
                  {...field}
                  size="large"
                  type="tel"
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Số điện thoại"
                  autoComplete="off"
                  style={{ marginTop: 8, color: '#2F3437', fontWeight: 500 }}
                />
              </>
            )}
          />
          <Controller
            name="password"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Mật khẩu
                </Typography.Text>
                <Input.Password
                  size="large"
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Mật khẩu"
                  style={{ marginTop: 8 }}
                  disabled={!isDataUpdated()}
                />
              </>
            )}
          />
        </Space>
        <Space
          size={16}
          style={{ width: '100%', justifyContent: 'flex-end', marginTop: 32 }}
        >
          <Button
            className="flex antiFlashWhite noBorder"
            onClick={() => {
              // method.reset();
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
            ghost={isLoading || !isDataUpdated()}
            disabled={isLoading || !isDataUpdated()}
            loading={isLoading}
          >
            Xác nhận
          </Button>
        </Space>
      </Form>
    </div>
  );
});

export default ChangeInfo;
