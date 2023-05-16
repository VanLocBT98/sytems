import Account from 'features/Account';
// import Dashboard from 'features/Dashboard';
import ForgetPassword from 'features/ForgetPassword';
import Outlet from 'features/Outlet';
import ProjectList from 'features/ProjectList';
import ProjectOverview from 'features/ProjectOverview';
import RawData from 'features/RawData';
import ResetPassword from 'features/ResetPassword';
import SalesVolume from 'features/SalesVolume';
import SignIn from 'features/SignIn';
import Warehouse from 'features/Warehouse';

type RouteProps = {
  id: number;
  name: string;
  path: string;
  element: React.ReactNode;
};

export const publicRoutes: RouteProps[] = [
  {
    id: 1,
    name: 'Login',
    path: 'login',
    element: <SignIn />
  },
  {
    id: 2,
    name: 'Reset Password',
    path: 'reset-password',
    element: <ResetPassword />
  },
  {
    id: 3,
    name: 'Forget Password',
    path: 'forget-password',
    element: <ForgetPassword />
  },
];

export const privateRoutes: RouteProps[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
    element: <ProjectOverview />
  },
  {
    id: 2,
    name: 'Tài khoản',
    path: 'account',
    element: <Account />
  },
  {
    id: 3,
    name: 'List of Project',
    path: 'projects',
    element: <ProjectList />
  },
  {
    id: 4,
    name: 'Warehouse',
    path: 'warehouse',
    element: <Warehouse />
  },
  {
    id: 5,
    name: 'Project Overview',
    path: 'project-overview',
    element: <ProjectOverview />
  },
  {
    id: 6,
    name: 'Raw Data',
    path: 'raw-data',
    element: <RawData />
  },
  {
    id: 7,
    name: 'KPI - Sales Volume',
    path: 'sales-volume',
    element: <SalesVolume />
  },
  {
    id: 8,
    name: 'Outlet',
    path: 'outlet',
    element: <Outlet />
  },
];

const routes = { privateRoutes, publicRoutes };

export default routes;
