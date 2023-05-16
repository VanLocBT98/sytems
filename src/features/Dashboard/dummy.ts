import { StatisticalCardProps } from 'common/components/organisms/StatisticalCard';

const statisticalList: StatisticalCardProps[] = [
  {
    label: 'Tất cả dự án',
    number: '1758',
    increasingPercent: '2.5%',
    isIncreased: true
  },
  {
    label: 'Dự án đang chạy',
    number: '156',
    increasingPercent: '2.5%',
    isIncreased: true
  },
  {
    label: 'Dự án đang tạm dừng',
    number: '31',
    increasingPercent: '3.2%',
    isIncreased: false
  },
  {
    label: 'Dự án đã kết thúc',
    number: '1253',
    increasingPercent: '2%',
    isIncreased: false
  },
];

export const agencyOptionsDummy: OptionsType[] = [
  {
    label: 'Tất cả',
    value: '0'
  },
  {
    label: 'Bpro',
    value: '1'
  },
  {
    label: 'Viva Network',
    value: '2'
  },
  {
    label: 'Dentsu Vietnam',
    value: '3'
  },
  {
    label: 'Hakuhoda',
    value: '4'
  },
];

export const yearOptionsDummy: OptionsType[] = [...Array(30)].map((_, i) => ({
  label: `${2000 + i}`,
  value: `${2000 + i}`
}));

export default statisticalList;
