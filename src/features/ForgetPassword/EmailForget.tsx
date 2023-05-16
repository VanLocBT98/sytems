import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button, Input, Space, Spin, Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ErrorBox from 'common/components/molecules/ErrorBox';
import HeadingDescription from 'common/components/molecules/HeadingDescription';
import Form from 'common/components/organisms/Form';
import { forgetPasswordSchema } from 'common/utils/schemas';

export type ForgetPasswordFormTypes = {
  email: string;
};

interface EmailForgetProps {
  onSubmit?: (data: ForgetPasswordFormTypes) => void;
}

const EmailForget: React.FC<EmailForgetProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorResponse[]>([]);

  const method = useForm<ForgetPasswordFormTypes>({
    resolver: yupResolver(forgetPasswordSchema)
  });
  const handleSubmit = (data: ForgetPasswordFormTypes) => {
    if (onSubmit) onSubmit(data);
  };

  useEffect(() => {
    if (Object.keys(method.formState.errors).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = Object.entries(method.formState.errors).map(([_, v]) => ({
        message: v.message || ''
      }));
      setErrors(res);
    } else setErrors([]);
  }, [method.formState.errors]);
  // TODO: Manage spinning by State
  return (
    <Spin spinning={false}>
      <HeadingDescription
        title="Bạn quên mật khẩu"
        description="Nhập email của bạn để tiến hành lấy lại mật khẩu"
      />
      <div className="p-forgetPassword_form">
        <Form method={method} submitForm={handleSubmit}>
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
                  value={field.value}
                  onChange={field.onChange}
                  status={fieldState.error ? 'error' : ''}
                  placeholder="Email"
                />
              )}
            />
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Đăng nhập
            </Button>
          </Space>
        </Form>
        <Space style={{ justifyContent: 'center', width: '100%', marginTop: 32 }}>
          <div onClick={() => navigate(-1)} className="cursor">
            <Typography.Text style={{
              color: '#285FFA',
              fontSize: 14,
              lineHeight: '16px',
            }}
            >
              Quay lại
            </Typography.Text>
          </div>
        </Space>
      </div>
    </Spin>
  );
};

export default EmailForget;
