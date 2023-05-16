import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import SignInTemplate, { LoginFormTypes } from './SignInUI';
import { getProfileAsync } from './authSlice';

import { useAppDispatch } from 'app/store';
import { loginService } from 'common/services/auth';
import { setAccessToken } from 'common/services/common/storage';
import loginSchema from 'common/utils/schemas';

const SignIn: React.FC = () => {
  /* State */
  const recaptchaToken = useRef<ReCAPTCHA>(null);
  const [errors, setErrors] = useState<ErrorResponse[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const method = useForm<LoginFormTypes>({
    resolver: yupResolver(loginSchema)
  });

  const { mutate: postSignInMutate, isLoading } = useMutation(
    'postSignIn',
    loginService,
    {
      onSuccess: (res) => {
        setAccessToken(res.token);
        dispatch(getProfileAsync());
        navigate('/'); // TO DO: should redirect the private route which pasted on url, if not thing pasted on url => redirect to home "/"
      },
      onError: (err) => {
        setErrors(err as ErrorResponse[]);
      }
    }
  );

  const handleLogin = async (data: LoginFormTypes) => {
    await recaptchaToken.current?.reset();
    const token = await recaptchaToken.current?.executeAsync();
    postSignInMutate({ ...data, ggRecaptchaToken: token || '' });
  };

  useEffect(() => {
    if (Object.keys(method.formState.errors).length > 0) {
      const res = Object.entries(method.formState.errors).map((
        [, v],
      ) => ({
        message: v.message || '',
      }));
      setErrors(res);
    } else setErrors([]);
  }, [method.formState.errors]);

  return (
    <>
      <SignInTemplate
        method={method}
        errors={errors}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
      <ReCAPTCHA
        ref={recaptchaToken}
        size="invisible"
        theme="light"
        badge="bottomright"
        sitekey={process.env.REACT_APP_RECAPTCHA_GOOGLE || ''}
      />
    </>
  );
};

export default SignIn;
