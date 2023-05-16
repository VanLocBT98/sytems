import { ColumnRawTypes } from './provider';

import { GiftTypes, SkuList } from 'common/services/trackings/types';

const skuCodeValue = (code: string) => {
  switch (code) {
    case 'sku-treg-chai':
      return 'skuTregChai';
    case 'sku-tcrys-chai':
      return 'skuTcrysChai';
    case 'sku-treg-lon':
      return 'skuTregLon';
    case 'sku-tcrys-lon':
      return 'skuTcrysLon';
    case 'sku-sg-beer':
      return 'skuSgBeer';
    case 'sku-tiger-family':
      return 'skuTigerFamily';
    case 'sku-tcrys':
      return 'skuTcrys';
    case 'sku-hvn-chai':
      return 'skuHvnChai';
    case 'sku-tpla-lon':
      return 'skuTplaLon';
    case 'sku-hvn-tiger':
      return 'skuHvnTiger';
    default:
      return 'Unknown';
  }
};

export const skuCodeText = (code: string) => {
  switch (code) {
    case 'sku-treg-chai':
      return 'Tiger Regular chai';
    case 'sku-tcrys-chai':
      return 'Tiger Crystal chai';
    case 'sku-treg-lon':
      return 'Tiger Regular lon';
    case 'sku-tcrys-lon':
      return 'Tiger Crystal lon';
    case 'sku-sg-beer':
      return 'SG Beer';
    case 'sku-tiger-family':
      return 'Tiger Family';
    case 'sku-tcrys':
      return 'Tiger Crystal';
    case 'sku-hvn-chai':
      return 'Bia HVN trừ Tiger';
    case 'sku-hvn-tiger':
      return 'Bia HVN trừ Tiger';
    case 'sku-tpla-lon':
      return 'Tiger Platinum lon';
    default:
      return 'Unknown';
  }
};

export const shiftQuantityCode = (code: string) => {
  switch (code) {
    case 'start_shift_quantity':
      return 'Stock Đầu ca';
    case 'end_shift_sold':
      return 'Sale Volume';
    default:
      return '';
  }
};
export const shiftQuantityAcronymCode = (code: string) => {
  switch (code) {
    case 'start_shift_quantity':
      return '';
    case 'end_shift_sold':
      return 'sv';
    default:
      return '';
  }
};

export const skuUnitValue = (unit: string) => {
  switch (unit) {
    case 'cans':
      return 'Lon';
    case 'bottle':
      return 'Chai';
    case 'cartons':
      return 'Thùng';
    case 'cartons_safes':
      return 'Thùng và Két';
    case 'safes':
      return 'Két';
    default:
      return 'unKnown';
  }
};

// - Raw data referenced to origin column to update value
export const getSKURawData = (raw: SkuList[], column: ColumnRawTypes[]) => {
  const origin: { [key: string]: string | number } = column.reduce((p, c) => ({
    ...p, [c.code]: '-'
  }), {});
  const curr = raw.reduce(
    (a, v) => ({
      ...a,
      [`${v.code.replace(/-/g, '')}${v.unit.replace(/_/g, '')}`]: v.quantity ?? '-',
      [`sv${v.code.replace(/-/g, '')}${v.unit.replace(/_/g, '')}`]: v.promotionVolumn ?? '-'
    }),
    {}
  );
  return { ...origin, ...curr };
};

export const getGiftRawData = (raw: GiftTypes[], column: ColumnRawTypes[]) => {
  const origin: { [key: string]: string | number } = column.reduce((p, c) => ({
    ...p, [c.code]: '-'
  }), {});
  const curr = raw.reduce(
    (a, v) => ({
      ...a,
      [`${v.code.replace(/-/g, '')}in`]: v.inStock ?? '-',
      [`${v.code.replace(/-/g, '')}out`]: v.outStock ?? '-'
    }),
    {}
  );
  return { ...origin, ...curr };
};

export const refactorColumnRaw = (column: ColumnRawTypes[][]) => column.filter((f) => JSON.stringify(f) !== '[]')
  .reduce((p: ColumnRawTypes[], c) => [...p, ...c], [])
  .reduce((p: ColumnRawTypes[], c) => (p.some((x) => x.code === c.code) ? p : [...p, c]), []);

export default skuCodeValue;
