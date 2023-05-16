import { yupResolver } from '@hookform/resolvers/yup';
import {
 Modal, notification, Spin, Typography
} from 'antd';
import React, {
 useContext, useEffect, useRef, useState
} from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useAppDispatch } from '../../app/store';

import AccountTemplate, {
  failUdateAvatarNotification,
  successUdateAvatarNotification,
  UpdateAvatarTypes,
} from './AccountUI';
import ChangeInfo, { ChangeInfoFormTypes, ChangeInfoRef } from './ChangeInfo';
import ChangePasswordInfo, {
  ChangePasswordInfoFormTypes,
  ChangePasswordRef,
  successChangePasswordNotification,
} from './ChangePassword';

import { useAppSelector } from 'app/store';
import { LayoutContext } from 'common/components/templates/MainLayout/context';
import {
  changeInfoService,
  changePasswordService,
  updateAvatarService,
} from 'common/services/auth';
import { getImageURL } from 'common/utils/functions';
import { changeInfoSchema, changePasswordSchema } from 'common/utils/schemas';
import { getProfileAsync } from 'features/SignIn/authSlice';

const Account: React.FC = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.auth);
  const { setTitle } = useContext(LayoutContext);
  const changePasswordRef = useRef<ChangePasswordRef>(null);
  const changeInfoRef = useRef<ChangeInfoRef>(null);
  const [openPopup, setOpenPopup] = useState({
    info: false,
    password: false,
  });

  useEffect(() => {
    if (setTitle) setTitle('Tài khoản');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // UPDATE AVATAR
  const updateAvatarMethod = useForm<UpdateAvatarTypes>({
    defaultValues: { image: undefined },
  });

  const { mutate: updateAvatarMutation } = useMutation(
    'postUpdateAvatar',
    updateAvatarService,
    {
      onSuccess() {
        dispatch(getProfileAsync());
        successUdateAvatarNotification();
      },
      onError(err) {
        const error: ErrorResponse = Array.isArray(err) ? err[0] : {};
        failUdateAvatarNotification(error.message);
      },
    },
  );

  const handleLoadImg = async (data: UpdateAvatarTypes) => {
    updateAvatarMutation({
      ...data,
    });
  };

  // CHANGE PASSWORD

  const [errorsChangePassword, setErrorsChangePassword] = useState<
    ErrorResponse[]
  >([]);

  const methodChangePassword = useForm<ChangePasswordInfoFormTypes>({
    resolver: yupResolver(changePasswordSchema),
  });

  const {
    mutate: postChangePasswordMutate,
    isLoading: isLoadingChangePassword,
  } = useMutation(
    'postChangePassword',
    changePasswordService,
    {
      onSuccess: () => {
        setOpenPopup((prev) => ({ ...prev, password: false }));
        successChangePasswordNotification();
      },
      onError: (err) => {
        setErrorsChangePassword(err as ErrorResponse[]);
      },
    },
  );

  const submitChangePassword = async (data: ChangePasswordInfoFormTypes) => {
    postChangePasswordMutate({
      password: data.oldPassword,
      newPassword: data.password,
    });
  };

  useEffect(() => {
    if (Object.keys(methodChangePassword.formState.errors).length > 0) {
      const res = Object.entries(methodChangePassword.formState.errors).map((
        [, v],
      ) => ({
        message: v.message || '',
      }));
      setErrorsChangePassword(res);
    } else setErrorsChangePassword([]);
  }, [methodChangePassword.formState.errors]);

  // CHANGE INFO

  const [errorsChangeInfo, setErrorsChangeInfo] = useState<
    ErrorResponse[]
  >([]);

  const methodChangeInfo = useForm<ChangeInfoFormTypes>({
    resolver: yupResolver(changeInfoSchema),
  });

  const successChangeInfoNotification = () => {
    notification.success({
      message: 'Thay đổi thông tin thành công!',
      placement: 'bottomRight',
    });
  };

  const { mutate: postChangeInfoMutate, isLoading: isLoadingChangeInfo } = useMutation(
      'postChangeInfo',
      changeInfoService,
      {
        onSuccess: () => {
          // setIsLoading(undefined);
          setOpenPopup((prev) => ({ ...prev, info: false }));
          dispatch(getProfileAsync());
          successChangeInfoNotification();
          methodChangeInfo.setValue('password', '');
        },
        onError: (err) => {
          // setIsLoading(undefined);
          setErrorsChangeInfo(err as ErrorResponse[]);
          methodChangeInfo.setValue('password', '');
        },
      },
    );

  const submitUpdateProfile = async (data: ChangeInfoFormTypes) => {
    postChangeInfoMutate({
      ...data,
      phonePrefix: '84',
    });
  };

  useEffect(() => {
    if (Object.keys(methodChangeInfo.formState.errors).length > 0) {
      const res = Object.entries(methodChangeInfo.formState.errors).map((
        [, v],
      ) => ({
        message: v.message || '',
      }));
      setErrorsChangeInfo(res);
    } else setErrorsChangeInfo([]);
  }, [methodChangeInfo.formState.errors]);

  return (
    <>
      <Spin spinning={userProfile.isPending}>
        <div className="p-account">
          <div className="site-card-border-less-wrapper">
            <AccountTemplate
              data={{
                name: userProfile.data?.name || '',
                phone: userProfile.data?.phone || '',
                email: userProfile.data?.email,
                avatar: getImageURL(userProfile.data?.avatar),
              }}
              method={updateAvatarMethod}
              handleUploadAvatar={handleLoadImg}
              handleEditInfo={() => setOpenPopup((prev) => ({ ...prev, info: true }))}
              handleChangePassword={() => setOpenPopup((prev) => ({ ...prev, password: true }))}
            />
          </div>
        </div>
      </Spin>

      {/* INFO MODAL  */}
      <Modal
        visible={openPopup.info}
        width={440}
        maskClosable={false}
        onCancel={() => {
          setOpenPopup((prev) => ({ ...prev, info: false }));
        }}
        title={(
          <Typography.Title level={5} style={{ color: '#090A0A' }}>
            Thay đổi thông tin
          </Typography.Title>
        )}
        footer={null}
      >
        <ChangeInfo
          activeForm={openPopup.info}
          ref={changeInfoRef}
          onCancel={() => {
            setOpenPopup((prev) => ({ ...prev, info: false }));
            setErrorsChangeInfo([]);
          }}
          onSubmit={submitUpdateProfile}
          method={methodChangeInfo}
          errors={errorsChangeInfo}
          isLoading={isLoadingChangeInfo}
        />
      </Modal>

      {/* CHANGE PASSWORD MODAL  */}
      <Modal
        visible={openPopup.password}
        width={440}
        maskClosable={false}
        onCancel={() => {
          changePasswordRef.current?.reset();
          setOpenPopup((prev) => ({ ...prev, password: false }));
        }}
        title={(
          <Typography.Title level={5} style={{ color: '#090A0A' }}>
            Thay đổi mật khẩu
          </Typography.Title>
        )}
        footer={null}
      >
        <ChangePasswordInfo
          ref={changePasswordRef}
          onSubmit={submitChangePassword}
          onCancel={() => {
            setOpenPopup((prev) => ({ ...prev, password: false }));
            setErrorsChangePassword([]);
          }}
          method={methodChangePassword}
          errors={errorsChangePassword}
          isLoading={isLoadingChangePassword}
        />
      </Modal>
    </>
  );
};

export default Account;
