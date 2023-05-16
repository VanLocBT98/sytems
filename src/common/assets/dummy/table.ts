const agencyInfoDataDummy = [...Array(23)].map((_, i) => ({
  projectCode: `${345435 + i}`,
  projectName: `KT0${i + 1}`,
  channel: `Channel ${i + 1}`,
  brand: 'Heineken',
  agency: 'Nova Eforce',
  productOwner: 'Davison',
  kickoffDate: '23/04/2019',
  endingDate: '23/04/2022',
  updatedAt: '23/04/2021',
  status: Math.floor(Math.random() * 3),
  id: 1 + i
}));

export const warehouseInfoDataDummy = [...Array(23)].map((_, i) => ({
  projectName: `KT0${i + 1}`,
  agency: 'Nova Eforce',
  located: 'HCM',
  category: 'POSM',
  itemName: 'Standee',
  quantity: 2,
  unitLabel: 'Cái',
  itemStatus: 'Nguyên vẹn',
  itemPicSrc: 'https://source.unsplash.com/random/40x40',
  remark: 'Như mới',
  createdDate: '23/04/2022',
  updatedAt: '23/04/2021',
  status: 'Khởi tạo',
  id: 1 + i
}));

export const projectOverviewDummy = [...Array(23)].map((_, i) => ({
  id: 1 + i,
  outletId: 66010102 + i,
  hr: `Văn Linh ${i + 1}`,
  outletName: 'Tài Hiếu II',
  bu: `Greater HCM & Highlands ${i + 1}`,
  region: 'South East',
  province: 'Đồng Nai',
  area: i % 2 === 0 ? 'HCM' : 'HN',
  district: 'Biên Hòa',
  ward: 'Tân Hiệp',
  address: '27 Đồng Khởi, Tân Hiệp, Biên Hòa',
  channel: 'All',
  outletType: 'Quán Nhậu',
  activitiesType: 'Basic',
  date: '20/09/2022',
  workingTime: '17h30 - 21h30',
  stockTigerRegularBottle: 82 + i,
  stockTigerRegularCan: 23 + i,
  stockTigerCrystalCan: 80 + i,
  stockTigerRegularCan2: 70 + i,
  stockTigerPlatinumCan: 33 + i,
  sgBeerBin: 42 + i,
  salveVolumeTigerKet: 33 + i,
  saleVolumnTigerBin: '-',
  saleVolumnTigerCrystalKet: '-',
  saleVolumnTigerCrystalBin: '-',
  numTableSetup: '-',
  brandTables: 32 + i,
  hvnTables: 50 + i,
  competitor: 90 + i,
  other: 45 + i,
  tablesHasGuest: 45 + i,
  tablesGame: 32 + i,
  grabVoucher50kIn: 32 + i,
  crossBagTigerIn: 32 + i,
  travelBagTigerIn: 0,
  poloShirtMale180TigerIn: 0,
  soundJbl3In: i + 1,
  kitGiftIn: i + 1,
  shaverPhilipsIn: i + 1,
  soundSamsungIn: i + 5,
  grabVoucher50kOut: i + 5,
  travelbagTigerOut: i + 5,
  poloShirtMale180TigerOut: i + 10,
  soundJbl3out: i + 2,
  kitGiftOut: i + 2,
  shaverPhilipsOut: i + 2,
  soundSamsungOut: i + 2,
}));

export const projectProgressTableDummy = [
  {
    planned: 40,
    title: 'Activation',
    actual: 12,
    ratio: '30%',
    id: 1,
  },
  {
    planned: 59,
    title: 'Time gone (days)',
    actual: 30,
    ratio: '39%',
    id: 2
  },
  {
    planned: 59,
    title: 'Sales Tiger family (Két + thùng)',
    actual: 30,
    ratio: '21%',
    id: 3
  },
  {
    planned: 59,
    title: 'Sales Tiger family (Két)',
    actual: 30,
    ratio: '15%',
    id: 4
  },
  {
    planned: 59,
    title: 'Sales Tiger Crystal (két + thùng)',
    actual: 30,
    ratio: '70%',
    id: 5
  },
];

export const saleVolumeDummy = [
  {
    planned: 40,
    title: 'Sales Tiger family (két + thùng)',
    actual: 12,
    id: 1,
  },
  {
    planned: 59,
    title: 'Sales Tiger family (két)',
    actual: 13,
    id: 2,
  },
  {
    planned: 23,
    title: 'Sales Tiger Crystal (két + thùng)',
    actual: 13,
    id: 3,
  },
];

export const tableShareDummy = [
  {
    title: 'Avg. Table/ activation',
    value: 37.5,
    id: 1,
  },
  {
    title: 'Avg. Brand table/ activaiton',
    value: 36.5,
    id: 2,
  },
  {
    title: 'KPI',
    value: 95,
    id: 3,
  },
];
export const allocationDummy = [
  {
    title: 'Activation',
    value: 69,
    id: 1,
  },
  {
    title: 'Timing (days)',
    value: 35,
    id: 2,
  },
];

export default agencyInfoDataDummy;
