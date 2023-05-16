import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ResetPasswordUI, { ResetPasswordFormTypes } from './ResetPasswordUI';

import { resetPasswordSchema } from 'common/utils/schemas';

const ResetPassword: React.FC = () => {
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const method = useForm<ResetPasswordFormTypes>({
    resolver: yupResolver(resetPasswordSchema)
  });
  const handleSubmit = (data: ResetPasswordFormTypes) => {
    console.log(data);
  };

  useEffect(() => {
    if (Object.keys(method.formState.errors).length > 0) {
      const res = Object.entries(method.formState.errors).map(([, v]) => ({
        message: v.message || ''
      }));
      setErrors(res);
    } else setErrors([]);
  }, [method.formState.errors]);

  return (
    <ResetPasswordUI method={method} onSubmit={handleSubmit} errors={errors} />
  );
};

export default ResetPassword;
