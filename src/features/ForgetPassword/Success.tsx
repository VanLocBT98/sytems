import { Space, Typography } from 'antd';
import React from 'react';

import successImage from 'common/assets/images/reset-success.png';
import Image from 'common/components/atoms/Image';
import HeadingDescription from 'common/components/molecules/HeadingDescription';

interface SuccessProps {
  handleResend?: () => void;
}

const Success: React.FC<SuccessProps> = ({ handleResend }) => (
  <div className="p-forgetPassword_success">
    <div className="p-forgetPassword_success_image">
      <Image src={successImage} ratio="1x1" />
    </div>
    <HeadingDescription
      title="Thông tin của bạn đã được gửi thành công"
      description="Email và tin nhắn để đặt lại mật khẩu đã được gửi đến tài khoản của bạn.
        Vui lòng thực hiện theo hướng dẫn để đặt lại mật khẩu."
    />
    <Space style={{ justifyContent: 'center', width: '100%', marginTop: 32 }}>
      <div onClick={handleResend} className="cursor">
        <Typography.Text style={{
          color: '#285FFA',
          fontSize: 14,
          lineHeight: '16px',
          fontWeight: 600
        }}
        >
          Gửi lại mã
        </Typography.Text>
      </div>
    </Space>
  </div>
);

export default Success;
