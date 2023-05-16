import {
  Button, Input, Space, Spin, Typography
} from 'antd';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';

import ErrorBox from 'common/components/molecules/ErrorBox';
import HeadingDescription from 'common/components/molecules/HeadingDescription';
import Form from 'common/components/organisms/Form';
import UnAuthentication from 'common/components/templates/UnAuthentication';

export type LoginFormTypes = {
  email: string;
  password: string;
};

interface SignInProps {
  method: UseFormReturn<LoginFormTypes>;
  isLoading?: boolean;
  errors?: ErrorResponse[];
  onSubmit: (data: LoginFormTypes) => void;
}

const SignInTemplate: React.FC<SignInProps> = ({
  method, isLoading, onSubmit, errors
}) => (
  <UnAuthentication>
    <div className="p-signIn">
      <div className="p-signIn_context">
        <Spin spinning={isLoading}>
          <HeadingDescription
            title="Heineken - Đăng nhập"
            description="Xin chào, vui lòng nhập thông tin đăng nhập"
          />
          <div className="p-signIn_form">
            <Form method={method} submitForm={onSubmit}>
              <Space direction="vertical" style={{ width: '100%', flexDirection: 'column' }} size={20}>
                {
                  errors && errors.length > 0
                  && <ErrorBox errors={errors} />
                }
                <Controller
                  name="email"
                  control={method.control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      size="large"
                      status={fieldState.error ? 'error' : ''}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Tên đăng nhập"
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={method.control}
                  render={({ field, fieldState }) => (
                    <Input.Password
                      {...field}
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={fieldState.error ? 'error' : ''}
                      placeholder="Mật khẩu"
                      type="password"
                    />
                  )}
                />
              </Space>
              <div className="p-signIn_forget">
                <Link
                  to="/forget-password"
                  title="Quên mật khẩu"
                  style={{
                    marginTop: 12,
                    fontSize: 12,
                    lineHeight: '16px',
                  }}
                >
                  <Typography.Text style={{
                    color: '#285FFA',
                    fontSize: 12,
                    lineHeight: '16px',
                  }}
                  >
                    Quên mật khẩu?
                  </Typography.Text>
                </Link>
              </div>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%', marginTop: 32 }}
              >
                Đăng nhập
              </Button>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  </UnAuthentication>
);

export default SignInTemplate;
