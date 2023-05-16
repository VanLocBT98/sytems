/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BarChartOutlined,
  ContainerOutlined, DropboxOutlined, HomeOutlined,
  LineChartOutlined, TableOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons';

import roles from './roles';

import { MenuItem } from 'common/components/organisms/Sidebar';

const menuSidebar: MenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: <LineChartOutlined />,
  //   path: '/',
  // },
  {
    title: 'Project Overview',
    icon: <TableOutlined />,
    path: '/project-overview',
    // role: roles.FILE_ALLFOLDERS
  },
  {
    title: 'KPI - Sales Volume',
    icon: <TableOutlined />,
    path: '/sales-volume',
    // role: roles.FILE_ALLFOLDERS
  },
  {
    title: 'Outlet',
    icon: <TableOutlined />,
    path: '/outlet',
    // role: roles.FILE_ALLFOLDERS
  },
  {
    title: 'Agency',
    icon: <ContainerOutlined />,
    items: [
      {
        title: '3forcom',
        path: '/3forcom',
        role: roles.NEWS_CATE_INDEX
      },
      {
        title: 'HH&T',
        path: '/hht',
        role: 'roles.NEWS_CATE_INDEX'
      },
    ],
  },
  {
    title: 'Raw Data',
    icon: <DropboxOutlined />,
    path: '/raw-data',
    // role: roles.FILE_ALLFOLDERS
  },
  {
    title: 'Nhân viên',
    icon: <TeamOutlined />,
    path: '/manv',
    role: roles.FILE_ALLFOLDERS
  },
  {
    title: 'Quản lý dự án',
    icon: <BarChartOutlined />,
    path: '/projects',
    role: roles.MENU_INDEX
  },
  {
    title: 'Kho',
    icon: <HomeOutlined />,
    path: '/warehouse',
    role: roles.MENU_INDEX
  },
  {
    title: 'Tài khoản',
    icon: <UserOutlined />,
    path: '/account',
    role: roles.MENU_INDEX
  },

];

export default menuSidebar;
