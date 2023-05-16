type Personnel = {
  id: number;
  username: string;
  rememberToken: null;
  createdAt: string;
  updatedAt: string;
  firstName: null;
  lastName: null;
  active: boolean;
  type: string;
  name: string;
};

export type GroupsSkuInfoTypes = {
  active: number;
  code: string;
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ActivityType = {
  id: number;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  provinceCode?: string;
  countryCode?: string;
  districtCode?: string;
  groups: GroupsSkuInfoTypes[];
};

export type GiftTypes = {
  code: string;
  inStock: number;
  outStock: number;
  inventory: number;
  giftInfor: {
    code: string;
    createdAt: string;
    id: number;
    name: string;
    quantity: number;
    updatedAt: string;
  }
};

export type SkuList = {
  code: string;
  trialHit: null;
  quantity: number;
  trialSampling: number;
  promotionVolumn: number;
  nonPromotionVolumn: number;
  unit: string;
  skuInfor: ActivityType;
};

export type AllTrackingsTypes = {
  code: number;
  outletCode: string;
  outletName: string;
  personnel: Personnel;
  bu: ActivityType;
  region: ActivityType;
  province: ActivityType;
  area: ActivityType;
  district: ActivityType;
  ward: ActivityType;
  address: string;
  channel: ActivityType;
  outletType: ActivityType;
  activityType: ActivityType;
  date: string;
  workingBegin: string;
  workingEnd: string;
  brandTables: number;
  hvnTables: number;
  competitorTables: number;
  otherTables: number;
  traffic: number;
  reach: number;
  playgameTables: number;
  outletTables: number;
  tableHasCustomers: number;
  comment: null | string;
  skuList: SkuList[];
  outletId?: number
  gifts: GiftTypes[];
};

export type GetAllTrackingsParamsTypes = {
  page?: number;
  limit?: number;
  outletCode?: number;
  buCode?: string;
  provinceCode?: string;
  fromDate?: string;
  toDate?: string;
};

// Get Image Folders by ID

export type GetListFolderDataTypes = {
  images?: ListFolderTypes[]
  posms?: Posm[]
};

export type ListFolderTypes = {
  id: number
  code: string
  name: string
  inList: boolean
  parentId?: number
  images: FolderImageTypes[]
};

export type FolderImageTypes = {
  url: string
  id: number
  createdAt: string
  updatedAt: string
};

export type Posm = {
  id: number
  activityTypeCode: string
  code: string
  name: string
  amount: number
  images: FolderImageTypes[]
};

export type DownloadImageByTrackingTypes = {
  link: string;
};

export interface ProjectInfoTypes {
  start: string
  end: string
  provinces: Provinces[];
  bu: Provinces[];
}

export interface Provinces {
  id: number
  countryCode: string
  name: string
  code: string
  createdAt: any
  updatedAt: any
}
// Get Project Progress

export type ProjectProgressDataTypes = {
  projectProgress: ProjectProgressTypes
  kpiSaleVolume: KpiSaleVolumeTypes
};

export type ProjectProgressTypes = {
  activation: ProjectTypes
  timming: ProjectTypes
};

export type ProjectTypes = {
  planned: number
  actual: number
  ratio: number
};

export type KpiSaleVolumeTypes = {
  planned: number
  actual: number
  ratio: number
};

// Get Table Share

export type TableShareTypes = {
  table: number
  brand: number
  ratio: number
  kpiTableShare: number
};

// Get Allocation

export type FilterParamsTypes = {
  provinceCode?: string
  fromDate?: string
  toDate?: string
};

export type GiftAllocationDataTypes = {
  allocation: number
  averageUsed: number
  ratio: number
  remained: number
};

export type ExportTrackingsTypes = {
  link: string;
};
