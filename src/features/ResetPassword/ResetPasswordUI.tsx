import {
  Button, Input, Space, Spin
} from 'antd';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import ErrorBox from 'common/components/molecules/ErrorBox';
import HeadingDescription from 'common/components/molecules/HeadingDescription';
import Form from 'common/components/organisms/Form';
import UnAuthentication from 'common/components/templates/UnAuthentication';

export type ResetPasswordFormTypes = {
  password: string;
  confirmPassword: string;
};

interface ResetPasswordUIProps {
  method: UseFormReturn<ResetPasswordFormTypes>;
  isLoading?: boolean;
  errors?: ErrorResponse[];
  onSubmit: (data: ResetPasswordFormTypes) => void;
}

const ResetPasswordUI: React.FC<ResetPasswordUIProps> = ({
  method, isLoading = false, errors, onSubmit
}) => (
  <UnAuthentication>
    <div className="p-resetPassword">
      <div className="p-resetPassword_context">
        <Spin spinning={isLoading}>
          <HeadingDescription
            title="Mật khẩu mới"
            description="Nhập mật khẩu để hoàn thành quá trình lấy lại mật khẩu."
          />
          <div className="p-resetPassword_form">
            <Form method={method} submitForm={onSubmit}>
              <Space direction="vertical" style={{ width: '100%', flexDirection: 'column' }} size={20}>
                {
                  errors && errors.length > 0
                  && <ErrorBox errors={errors} />
                }
                <Controller
                  name="password"
                  control={method.control}
                  render={({ field, fieldState }) => (
                    <Input.Password
                      {...field}
                      size="large"
                      status={fieldState.error ? 'error' : ''}
                      value={field.value}
                      onChange={field.onChange}
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={method.control}
                  render={({ field, fieldState }) => (
                    <Input.Password
                      {...field}
                      size="large"
                      value={field.value}
                      status={fieldState.error ? 'error' : ''}
                      onChange={field.onChange}
                      placeholder="Nhập lại mật khẩu mới"
                      type="password"
                    />
                  )}
                />
              </Space>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%', marginTop: 32 }}
              >
                Xác nhận
              </Button>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  </UnAuthentication>
);

export default ResetPasswordUI;
