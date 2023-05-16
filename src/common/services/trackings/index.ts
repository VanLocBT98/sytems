import axiosInstance from '../common/instance';

import {
  AllTrackingsTypes, DownloadImageByTrackingTypes, ExportTrackingsTypes, FilterParamsTypes,
  GetAllTrackingsParamsTypes, GetListFolderDataTypes,
  GiftAllocationDataTypes, ProjectInfoTypes, ProjectProgressDataTypes,
  TableShareTypes
} from './types';

const getAllTrackingsService = async (
  params?: GetAllTrackingsParamsTypes,
): Promise<APIPaginationResponse<AllTrackingsTypes[]>> => {
  const res = await axiosInstance.get('trackings', { params });
  return res.data;
};

export const getListFolderService = async (
  params?: number
): Promise<GetListFolderDataTypes> => {
  const res = await axiosInstance.get(`trackings/${params}/list-folders`);
  return res.data.data;
};

export const downloadImageByTrackingService = async (
  params: number
): Promise<DownloadImageByTrackingTypes> => {
  const res = await axiosInstance.post(`trackings/${params}/download-files`);
  return res.data.data;
};

export const getTableShareService = async (
  params?: FilterParamsTypes,
): Promise<TableShareTypes> => {
  const res = await axiosInstance.get('trackings/table-share', { params });
  return res.data.data;
};
export const getProjectProgressService = async (
  params?: FilterParamsTypes,
): Promise<
  ProjectProgressDataTypes
> => {
  const res = await axiosInstance.get('trackings/project-progress', { params });
  return res.data.data;
};
export const getGiftAllocationService = async (
  params?: FilterParamsTypes,
): Promise<GiftAllocationDataTypes> => {
  const res = await axiosInstance.get('trackings/gift-allocations', { params });
  return res.data.data;
};

// Filter
export const getInfoProjectService = async (): Promise<
  ProjectInfoTypes
> => {
  const res = await axiosInstance.get('trackings/project-info');
  return res.data.data;
};

export const exportsTrackingService = async (
  params?: GetAllTrackingsParamsTypes
): Promise<ExportTrackingsTypes> => {
  const res = await axiosInstance.post('trackings/exports', params);
  return res.data.data;
};

export default getAllTrackingsService;
