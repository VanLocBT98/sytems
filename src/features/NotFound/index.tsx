import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import image from 'common/assets/images/notfound.png';
import Image from 'common/components/atoms/Image';

const NotFound: React.FC = () => (
  <div className="p-notfound">
    <div className="p-notfound_image">
      <Image src={image} alt="not found" ratio="1x1" />
    </div>
    <Typography.Title level={1} className="u-mt-48">Rất tiếc, chúng tôi không tìm thấy trang này</Typography.Title>
    <Typography.Title level={4} className="u-mt-24">
      Vui lòng trở về
      {' '}
      <Link to="/">
        trang chủ
      </Link>
      {' '}
      hoặc liên hệ với chúng tôi để được hỗ trợ.
    </Typography.Title>
  </div>
);

export default NotFound;
