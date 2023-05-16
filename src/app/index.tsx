import React, { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Navigate, Route, Routes
} from 'react-router-dom';
import '../common/styles/library/antd.less';
import './index.scss';

import { store, useAppDispatch, useAppSelector } from './store';
import { getProjectInfoAsync } from './trackingSlice';

import MainLayout from 'common/components/templates/MainLayout';
import { LayoutProvider } from 'common/components/templates/MainLayout/context';
import useGlobalError from 'common/hooks/useGlobalError';
import { getAccessToken } from 'common/services/common/storage';
import { privateRoutes, publicRoutes } from 'configs/routes';
import menuSidebar from 'configs/sidebar';
import NotFound from 'features/NotFound';
import { getProfileAsync } from 'features/SignIn/authSlice';

interface PrivateWrapperProps {
  children: ReactNode;
}

interface PublicWrapperProps {
  children: ReactNode;
}

const PublicWrapper: React.FC<PublicWrapperProps> = ({ children }) => {
  const token = getAccessToken();

  if (token) return <Navigate to="/" replace />;
  return (
    <div>
      {children}
    </div>
  );
};

const PrivateWrapper: React.FC<PrivateWrapperProps> = ({ children }) => {
  const token = getAccessToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfileAsync());
    dispatch(getProjectInfoAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div>
      {children}
    </div>
  );
};

const RoutesApp: React.FC = () => {
  useGlobalError();
  const auth = useAppSelector((state) => state.auth);
  return (
    <Routes>
      {publicRoutes.map((item) => (
        <Route
          key={`${item.name}${item.id}`}
          path={item.path}
          element={(
            <PublicWrapper>
              {item.element}
            </PublicWrapper>
          )}
        />
      ))}
      <Route element={(
        <LayoutProvider>
          <PrivateWrapper>
            <MainLayout
              userInfo={auth.data}
              menus={menuSidebar}
            />
          </PrivateWrapper>
        </LayoutProvider>
      )}
      >
        {privateRoutes.map((item) => (
          <Route
            key={`${item.name}${item.id}`}
            path={item.path}
            element={item.element}
          />
        ))}
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: () => {
        // TODO:
      },
    },
    mutations: {
      onError: () => {
        // TODO:
      },
    }
  },
});

const App: React.FC = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

export default App;
