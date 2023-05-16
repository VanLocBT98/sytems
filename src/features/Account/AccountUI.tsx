import {
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  LockFilled,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar, Button, Card, notification, Space, Typography
} from 'antd';
import React, { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import Icon from 'common/components/atoms/Icon';
import Form from 'common/components/organisms/Form';
import { getImageURL } from 'common/utils/functions';

export type UserAccountTypes = {
  name: string;
  phone?: string;
  email?: string;
  avatar?: string;
  password?: string;
};
export type UpdateAvatarTypes = {
  image: File;
};
interface AccountTemplateProps {
  data: UserAccountTypes;
  handleUploadAvatar?: (file: UpdateAvatarTypes) => void;
  handleEditInfo?: () => void;
  handleChangePassword?: () => void;
  method: UseFormReturn<UpdateAvatarTypes>;
}
export const successUdateAvatarNotification = () => {
  notification.success({
    message: 'Cập nhật ảnh đại diện thành công!',
    placement: 'bottomRight',
  });
};

export const failUdateAvatarNotification = (mess?: string) => {
  notification.error({
    message: mess,
    placement: 'bottomRight',
  });
};

const AccountInfoItem: React.FC<{ label?: string; value?: string }> = ({
  label,
  value,
}) => (
  <div className="p-account_item">
    <Typography.Text style={{ color: '#798082' }}>
      {label}
    </Typography.Text>
    <Typography.Text style={{ color: '#2C3032', fontWeight: 500 }}>
      {value}
    </Typography.Text>
  </div>
);

const AccountTemplate: React.FC<AccountTemplateProps> = ({
  data,
  handleUploadAvatar,
  handleEditInfo,
  handleChangePassword,
  method,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [currentFile, setCurrentFile] = useState<UpdateAvatarTypes>();

  const handleLoadImg = async (file: UpdateAvatarTypes) => {
    if (!file) return;
    if (file && file?.image.size > (2 * 1024 * 1024)) {
      setPreviewUrl(undefined);
      setCurrentFile(undefined);
      failUdateAvatarNotification('File hình ảnh không được quá 3MB');
    } else if (
      file && ([
        'image/png',
        'image/jpg',
        'image/jpeg',
      ].includes(file?.image.type) === false)
    ) {
      setPreviewUrl(undefined);
      setCurrentFile(undefined);
      failUdateAvatarNotification('Định dạng file ảnh sai');
    } else {
      setPreviewUrl(URL.createObjectURL(file.image));
      setCurrentFile(file);
    }
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title={(
          <Typography.Title level={4} style={{ color: '#090A0A' }}>
            Thông tin tài khoản
          </Typography.Title>
        )}
        style={{ width: 380 }}
      >
        <Form method={method} submitForm={handleLoadImg}>
          <Controller
            name="image"
            control={method.control}
            render={({ field }) => (
              <div className="p-account_avatar">
                <Avatar
                  src={previewUrl || getImageURL(data.avatar as string)}
                  shape="square"
                  icon={<UserOutlined />}
                  size={160}
                />

                {previewUrl
                  ? (
                    <>
                      <div
                        className="p-account_avatar_confirm"
                        onClick={() => {
                          if (
                            handleUploadAvatar && currentFile
                          ) {
                            handleUploadAvatar(currentFile);
                          }
                          setPreviewUrl(undefined);
                        }}
                      >
                        <CheckOutlined
                          style={{
                            color: '#ffffff',
                            fontSize: 20,
                            lineHeight: 0,
                            borderRadius: 10,
                          }}
                        />
                      </div>
                      <div
                        className="p-account_avatar_cancel"
                        onClick={() => setPreviewUrl(undefined)}
                      >
                        <CloseOutlined
                          style={{
                            color: '#ffffff',
                            fontSize: 20,
                            lineHeight: 0,
                            borderRadius: 10,
                          }}
                        />
                      </div>
                    </>
                  )
                  : (
                    <label htmlFor="avatar">
                      <div className="p-account_avatar_edit">
                        <Icon iconName="edit" size="16x16" />
                      </div>
                      <input
                        name={field.name}
                        accept=".jpg, .jpeg, .png"
                        id="avatar"
                        type="file"
                        size={3145728}
                        className="p-account_avatar_input"
                        onChange={(e) => e.target.files !== null
                          && handleLoadImg({ image: e.target.files[0] })}
                      />
                    </label>
                  )}
              </div>
            )}
          />
        </Form>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          {data.name}
        </Typography.Title>
        <div className="p-account_info">
          <AccountInfoItem label="Số điện thoại" value={data.phone} />
          <AccountInfoItem label="Email" value={data.email} />
          {/* <AccountInfoItem label="Mật khẩu" value={passwordHiddenString} /> */}
        </div>
        <div className="p-account_button">
          <Space size={12} style={{ width: '100%' }}>
            <Button
              icon={<EditFilled />}
              style={{ width: '100%' }}
              className="flex goldenPoppy"
              onClick={() => handleEditInfo && handleEditInfo()}
            >
              Đổi thông tin
            </Button>
            <Button
              icon={<LockFilled />}
              className="flex crayola"
              style={{ width: '100%' }}
              onClick={() => handleChangePassword && handleChangePassword()}
            >
              Đổi mật khẩu
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default AccountTemplate;
