import { ExclamationCircleTwoTone } from '@ant-design/icons';
import {
 Avatar, Menu, Modal, Space, Typography
} from 'antd';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import signOutIcon from 'common/assets/icons/ic_signOut.svg';
import { removeAccessToken } from 'common/services/common/storage';
import mapModifiers from 'common/utils/functions';

export interface MenuItem {
  icon?: React.ReactNode;
  title: string;
  path?: string;
  items?: MenuItem[];
  role?: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  collapsed?: boolean;
}

function getItem(label: string, key: string, icon?: React.ReactNode, children?: any) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, collapsed }) => {
  // const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigator = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn Đăng xuất?',
      icon: <ExclamationCircleTwoTone twoToneColor="#ff7875" />,
      maskClosable: true,
      onOk: () => {
        removeAccessToken();
        navigator('/login');
      },
    });
  };

  const menuItemsArr = useMemo(() => menuItems.map((menu) => getItem(
    menu.title,
    `${menu.path}`,
    menu.icon,
    menu.items && menu.items.length ? menu.items.map((m) => (
      getItem(m.title, `${m.path}`, m.icon)
    )) : undefined
  )), [menuItems]);

  return (
    <div className="sideBar_wrapper">
      <Menu
        className="sideBar_menus"
        mode="inline"
        items={menuItemsArr}
        inlineCollapsed={collapsed}
        defaultSelectedKeys={[location.pathname]}
        onClick={({ key }) => navigator(key)}
      />
      <div className={mapModifiers('sideBar_action', collapsed && 'collapsed')}>
        {
          /* <Divider className="sidebar_divider"
        style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} /> */
        }
        <div className="sideBar_profile">
          <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <Space size={8}>
              <Avatar size={20} src={signOutIcon} />
              {!collapsed && (
                <Typography.Text
                  style={{
                    fontSize: 14,
                    color: '#2C3032',
                    fontWeight: 500,
                  }}
                >
                  Đăng xuất
                </Typography.Text>
              )}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
