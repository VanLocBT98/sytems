import axiosInstance from '../common/instance';

import { PostChangePassBodyTypes, PostLoginBodyTypes, ProfileTypes } from './types';

import { UpdateAvatarTypes } from 'features/Account/AccountUI';
import { ChangeInfoFormTypes } from 'features/Account/ChangeInfo';

export const loginService = async (params: PostLoginBodyTypes) => {
  const res = await axiosInstance.post('auth/login', params);
  return res.data.data;
};

export const getProFileService = async (): Promise<ProfileTypes> => {
  const res = await axiosInstance.get('auth/profile');
  return res.data.data;
};

export const changeInfoService = async (params: ChangeInfoFormTypes) => {
  const res = await axiosInstance.post('auth/profile', params);
  return res;
};

export const changePasswordService = async (params: PostChangePassBodyTypes) => {
  const res = await axiosInstance.post('auth/change-password', params);
  return res;
};

export const updateAvatarService = async (data: UpdateAvatarTypes) => {
  const dataTemp = new FormData();
  dataTemp.append('image', data.image);
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };
  const res = await axiosInstance.post('auth/update-avatar', dataTemp, config);
  return res;
};

export default loginService;
