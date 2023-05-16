import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Button, Input, notification, Space, Typography
} from 'antd';
import React, { useImperativeHandle } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import ErrorBox from 'common/components/molecules/ErrorBox';
import Form from 'common/components/organisms/Form';

export type ChangePasswordInfoFormTypes = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export interface ChangePasswordRef {
  reset(): void;
}

interface ChangePasswordInfoProps {
  onCancel?: () => void;
  method: UseFormReturn<ChangePasswordInfoFormTypes>;
  errors?: ErrorResponse[];
  isLoading?: boolean | undefined;
  onSubmit?: (data: ChangePasswordInfoFormTypes) => void;
}

export const successChangePasswordNotification = () => {
    notification.success({
      message: 'Đổi mật khẩu thành công!',
      placement: 'bottomRight',
    });
  };

const ChangePasswordInfo = React.forwardRef<ChangePasswordRef, ChangePasswordInfoProps>(({
  onCancel, onSubmit, method, errors, isLoading
}, ref) => {
  useImperativeHandle(ref, () => ({
    reset() {
      method.reset();
    }
  }));

  const handleSubmit = (data: ChangePasswordInfoFormTypes) => {
    if (onSubmit) onSubmit(data);
    method.reset();
  };

  return (
    <div className="t-changePassword">
      <Form method={method} submitForm={handleSubmit}>
        <Space direction="vertical" style={{ width: '100%', flexDirection: 'column' }} size={20}>
          {
            errors && errors.length > 0
            && <ErrorBox errors={errors} />
          }
          <Controller
            name="oldPassword"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Mật khẩu cũ
                </Typography.Text>
                <Input.Password
                  size="large"
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Mật khẩu"
                  style={{ marginTop: 8 }}
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
                  Mật khẩu mới
                </Typography.Text>
                <Input.Password
                  size="large"
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Mật khẩu"
                  style={{ marginTop: 8 }}
                />
              </>
            )}
          />
          <Controller
            name="confirmPassword"
            control={method.control}
            render={({ field, fieldState }) => (
              <>
                <Typography.Text style={{ color: '#798082', fontWeight: 500 }}>
                  Nhập lại mật khẩu mới
                </Typography.Text>
                <Input.Password
                  size="large"
                  status={fieldState.error ? 'error' : ''}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập Mật khẩu"
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
            loading={isLoading}
          >
            Xác nhận
          </Button>
        </Space>
      </Form>
    </div>
  );
});

export default ChangePasswordInfo;
