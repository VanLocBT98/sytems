import { Modal } from 'antd';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { hideModalError } from 'app/systemSlice';

const useGlobalError = (): void => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { statusError, showModalError } = useAppSelector((state) => state.system);
  const errorData = useCallback(() => {
    switch (statusError) {
      case 503:
        return {
          title: 'Server',
          content: 'Service Unavailable',
        };
      default:
        return {
          title: 'Error',
          content: 'Something went wrong',
        };
    }
  }, [statusError]);

  useEffect(() => {
    if (showModalError) {
      Modal.error({
        ...errorData(),
        onOk: () => {
          dispatch(hideModalError());
          navigator('/');
        }
      });
    }
  }, [dispatch, navigator, errorData, showModalError]);
};

export default useGlobalError;
