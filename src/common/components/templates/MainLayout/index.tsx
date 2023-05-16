/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExclamationCircleTwoTone, LeftOutlined, RightOutlined, UserOutlined
} from '@ant-design/icons';
import {
  Avatar,
  // Button,
  Dropdown,
  Image,
  Menu,
  Modal,
  Space,
  Typography,
} from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React, { useContext } from 'react';
import {
  Link, useNavigate, Outlet
} from 'react-router-dom';

import { LayoutContext } from './context';

import iconLogoImg from 'common/assets/images/icon_logo.png';
import logoImg from 'common/assets/images/logo.png';
import Icon from 'common/components/atoms/Icon';
import Sidebar from 'common/components/organisms/Sidebar';
import { removeAccessToken } from 'common/services/common/storage';
import mapModifiers, { getImageURL } from 'common/utils/functions';

export type UserInfoTypes = {
  id?: number;
  name?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
  phone?: string;
  phonePrefix?: string;
};
interface MainLayoutProps {
  menus: any[];
  userInfo?: UserInfoTypes;
}
const { Title } = Typography;
const MainLayout: React.FC<MainLayoutProps> = ({ menus, userInfo }) => {
  const navigate = useNavigate();
  const { title, collapsed, setCollapsed } = useContext(LayoutContext);

  /**
   * Handle Logout
   */
  const handleLogout = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn Đăng xuất?',
      icon: <ExclamationCircleTwoTone twoToneColor="#ff7875" />,
      maskClosable: true,
      onOk: () => {
        removeAccessToken();
        navigate('/login');
      },

    });
  };

  const dropdownMenu = (
    <Menu
      items={[
        {
          label: (
            <Link to="/account">
              <Space size={12} style={{ width: '100%' }}>
                <Icon iconName="personCircle" size="20x20" />
                <Typography.Text style={{ fontWeight: 500 }}>
                  Tài khoản
                </Typography.Text>
              </Space>
            </Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to="/account">
              <Space size={12} style={{ width: '100%' }}>
                <Icon iconName="lock" size="20x20" />
                <Typography.Text style={{ fontWeight: 500 }}>
                  Đổi mật khẩu
                </Typography.Text>
              </Space>
            </Link>
          ),
          key: '2',
        },
        {
          label: (
            <Space size={12} style={{ width: '100%' }} onClick={handleLogout}>
              <Icon iconName="signOut" size="20x20" />
              <Typography.Text style={{ fontWeight: 500 }}>
                Đăng xuất
              </Typography.Text>
            </Space>
          ),
          key: '3',
        },
      ]}
    />
  );

  return (
    <Layout>
      <Sider width={collapsed ? 80 : 242} className="site-layout-background">
        <div className="t-mainlayout_sidebar_wrapper">
          <div
            className={mapModifiers(
              't-mainlayout_sidebar_header',
              collapsed ? '' : 'open',
            )}
          >
            {!collapsed
              && <Image width={135} src={logoImg} preview={false} />}
            <div
              className={`sideBar_buttonCollapse${collapsed ? '' : ' open'}`}
              onClick={setCollapsed}
            >
              {collapsed
                ? (
                  <RightOutlined
                    style={{
                      color: '#007125',
                      fontSize: 20,
                      lineHeight: 0,
                      borderRadius: 10,
                    }}
                  />
                )
                : (
                  <LeftOutlined
                    style={{
                      color: '#007125',
                      fontSize: 20,
                      lineHeight: 0,
                      borderRadius: 10,
                    }}
                  />
                )}
            </div>
          </div>
          {collapsed && (
            <Space style={{ width: '100%', justifyContent: 'center' }}>
              <Link to="/">
                <Image src={iconLogoImg} width={36} preview={false} />
              </Link>
            </Space>
          )}
          <div className="t-mainlayout_sidebar_menu">
            <Sidebar
              menuItems={menus}
              collapsed={collapsed}
            />
          </div>
        </div>
      </Sider>
      <Layout className="t-mainlayout_content">
        <Header className={`t-mainlayout_header${collapsed ? ' expand' : ''}`}>
          <Title
            style={{
              color: '#090A0A',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {title}
          </Title>

          <Space className="t-mainLayout_header_right" size={24}>
            {/* <div className="t-mainLayout_header_notification">
              <Button
                onClick={() => { }}
                type="link"
                style={{ paddingTop: 22 }}
                icon={<Icon iconName="alert" size="24x24" />}
              />
            </div> */}
            {/* <Dropdown
              overlay={dropdownMenu}
              trigger={['click']}
              placement="bottom"
              className="cursor"
            > */}
            <Space className="t-mainLayout_header_info" size={12}>
              <Typography.Text
                title={userInfo?.name}
                style={{
                  color: '#090A0A',
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {userInfo?.name ? userInfo.name : 'Unknown'}
              </Typography.Text>
              <Avatar
                src={userInfo?.avatar ? getImageURL(userInfo.avatar) : <UserOutlined />}
                size={40}
              />
              {/* <Icon iconName="caret" size="16x16" /> */}
            </Space>
            {/* </Dropdown> */}
          </Space>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>

    </Layout>
  );
};

export default MainLayout;
