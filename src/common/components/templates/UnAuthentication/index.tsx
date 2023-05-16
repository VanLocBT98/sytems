import {
  Col, Layout, Row
} from 'antd';
import React from 'react';

import logoImg from 'common/assets/images/logo.png';
import Image from 'common/components/atoms/Image';
import mapModifiers from 'common/utils/functions';

interface UnAuthenticationProps {
  children?: React.ReactNode;
  className?: string;
  logo?: string;
}

const UnAuthentication: React.FC<UnAuthenticationProps> = ({ children, className, logo }) => (
  <Layout style={{ background: '#fff' }} className={mapModifiers('t-unAuthentication', className)}>
    <Row className="t-unAuthentication_row">
      <Col span={24} lg={12}>
        <div className="t-unAuthentication_background">
          <div className="t-unAuthentication_background_wrap">
            <Image src={logo || logoImg} ratio="logo" />
          </div>
        </div>
      </Col>
      <Col span={24} lg={12}>
        {children}
      </Col>
    </Row>
  </Layout>
);

UnAuthentication.defaultProps = {
  children: undefined,
};

export default UnAuthentication;
