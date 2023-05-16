/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
import { FileImageOutlined } from '@ant-design/icons';
import {
  Button, message, Modal, Typography
} from 'antd';
import React, {
  useEffect, useMemo, useState
} from 'react';
import { useMutation } from 'react-query';

import OCFinderContainer, { OutletInfoPopupTypes } from './OCFinderContainer';
import {
  getGiftRawData, getSKURawData, refactorColumnRaw,
  shiftQuantityAcronymCode, shiftQuantityCode, skuCodeText, skuUnitValue
} from './helpers';
import Provider, { ColumnRawTypes } from './provider';

import { useAppSelector } from 'app/store';
import PageTable from 'common/components/templates/PageTable';
import { FilterFieldTypes } from 'common/components/templates/PageTable/TableFilter';
import getAllTrackingsService, { exportsTrackingService } from 'common/services/trackings';
import { AllTrackingsTypes, GetAllTrackingsParamsTypes } from 'common/services/trackings/types';
import { formatDateDDMMYYYY, formatHoursMinutes } from 'common/utils/functions';

type FilterTypes = {
  bu: string;
  outlet: string;
  province: string;
  date: string[];
};

export type SKUAconymTypes = {
  skuTigerCrystal: string;
  skuTigerFamily: string;
  skuHvnTiger: string;
  skuSgBeer: string;
  skuTigerCrystalLon: string;
  skuTigerRegularLon: string;
  skuTigerPlatinumLon: string;
  skuTigerCrystalChai: string;
  skuTigerRegularChai: string;
};

const RawData: React.FC = () => {
  /** State */
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState(20);
  const [rawData, setRawData] = useState<AllTrackingsTypes[]>();
  const [skuColumnRaw, setSkuColumnRaw] = useState<ColumnRawTypes[]>([]);
  const [giftColumnRaw, setGiftColumnRaw] = useState<ColumnRawTypes[]>([]);
  const [filterVar, setFilterVar] = useState<FilterTypes>();
  const [exportLoading, setExportLoading] = useState(false);
  const [outletInfo, setOutletInfo] = useState<any>();
  const [openPopup, setOpenPopup] = useState({
    image: false,
  });
  const [currentOutlet, setCurrentOutlet] = useState<number>();

  /** Stores */
  const { projectInfo: projectInfoStore } = useAppSelector((state) => state.tracking);
  const filterRawDataStore = useAppSelector((state) => state.system.rawDataFilter);

  /** Queries */

  const { mutate: getTrackingMutate, isLoading } = useMutation(
    ['getAllTrackings'],
    (params?: GetAllTrackingsParamsTypes) => getAllTrackingsService(params),
    {
      onSuccess(data) {
        setRawData(data.data);
      },
      onError() {
        setRawData([]);
      },
    },
  );

  useEffect(() => {
    getTrackingMutate(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Events */
  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetCurrentView = (view: number) => {
    setCurrentView(view);
  };

  const rawDataFormatted = useMemo(() => (rawData
    ? rawData.map((m) => ({
      id: m.code,
      outletId: m.outletCode,
      code: m.code,
      // hr: m.personnel.name ? m.personnel.name : '-',
      outletName: m.outletName,
      bu: m.bu.name,
      region: m.region.name,
      province: m.province.name,
      area: m.area.name,
      district: m.district.name,
      ward: m.ward.name,
      address: m.address,
      comment: m.comment,
      channel: m.channel.name,
      outletType: m.outletType.name,
      activitiesType: m.activityType.name,
      date: formatDateDDMMYYYY(m.date),
      workingTime: `${formatHoursMinutes(m.workingBegin)} - ${formatHoursMinutes(m.workingEnd)}`,
      ...getSKURawData(m.skuList, skuColumnRaw),
      numTableSetup: m.outletTables, // ---not
      brandTables: m.brandTables,
      hvnTables: m.hvnTables,
      competitor: m.competitorTables,
      other: m.otherTables,
      tablesHasGuest: m.tableHasCustomers,
      tablesGame: m.playgameTables,
      ...getGiftRawData(m.gifts, giftColumnRaw)
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    : []), [rawData, skuColumnRaw]);

  /**
   *  FILTER FIELDs
   */
  const filter: FilterFieldTypes[] = useMemo(() => [
    {
      name: 'outlet',
      placeHolder: 'Outlet',
      type: 'text',
    },
    {
      name: 'bu',
      placeHolder: 'BU',
      type: 'select',
      options: projectInfoStore
        ? projectInfoStore.bu.map((v) => ({
          value: v.code,
          label: v.name
        }))
        : [],
    },
    {
      name: 'province',
      placeHolder: 'Province',
      type: 'select',
      options: projectInfoStore
        ? projectInfoStore.provinces.map((v) => ({
          value: v.code,
          label: v.name
        }))
        : [],
    },
    {
      name: 'dateRange',
      placeHolder: '',
      type: 'daterange',
    },
  ], [projectInfoStore]);

  /**
   * REFACTOR COLUMN DATA TO GENERATE COLUMN TABLE
   * SKU
   * GIFT
   */
  useEffect(() => {
    if (!rawData) return;

    const skuArr: ColumnRawTypes[][] = [];
    const saleVolumeArr: ColumnRawTypes[][] = [];
    const giftArrIn: ColumnRawTypes[][] = [];
    const giftArrOut: ColumnRawTypes[][] = [];
    const test: ColumnRawTypes[][] = [];

    rawData.forEach((item) => {
      const abc = item.skuList.map((v) => v.skuInfor.groups.map((d) => ({
        name: `${shiftQuantityCode(d.code)} ${skuCodeText(v.code)} (${skuUnitValue(v.unit)})`,
        code: `${shiftQuantityAcronymCode(d.code)}${v.code.replace(/-/g, '')}${v.unit.replace(/_/g, '')}`
      })));

      test.push(...abc);

      // format code: code+ `in/out`
      giftArrIn.push(item.gifts.map((v) => ({
        name: v.giftInfor ? `${v.giftInfor.name} In` : 'Unknown',
        code: `${v.code.replace(/-/g, '')}in`
      })));
      giftArrOut.push(item.gifts.map((v) => ({
        name: v.giftInfor ? `${v.giftInfor.name} Out` : 'Unknown',
        code: `${v.code.replace(/-/g, '')}out`
      })));
    });

    // CLEAN ARRAY
    // SKU
    // const res1 = refactorColumnRaw(skuArr);
    // const res2 = refactorColumnRaw(saleVolumeArr);
    // Gift
    const res = refactorColumnRaw(test);
    const res3 = refactorColumnRaw(giftArrIn);
    const res4 = refactorColumnRaw(giftArrOut);

    // Bring sku code in front in array
    const arrangeRes = res.sort((a, b) => (
      // eslint-disable-next-line no-nested-ternary
      !a.code.includes('sv') ? -1
        : !b.code.includes('sv') ? 1 : 0));

    // State
    setSkuColumnRaw(arrangeRes);
    setGiftColumnRaw([...res3, ...res4]);
  }, [rawData]);

  /**
   * Filter Handler
   */
  const generateParams = (data: FilterTypes) => {
    let filterParams: GetAllTrackingsParamsTypes = {};
    if (data.date) {
      filterParams = {
        ...filterParams,
        fromDate: data.date[0],
        toDate: data.date[1],
      };
    }

    if (data.bu) {
      filterParams = {
        ...filterParams,
        buCode: data.bu,
      };
    }
    if (data.province) {
      filterParams = {
        ...filterParams,
        provinceCode: data.province,
      };
    }
    if (data.outlet) {
      filterParams = {
        ...filterParams,
        outletCode: Number(data.outlet),
      };
    }
    return filterParams;
  };
  const onFiltering = (data: any) => {
    const formattedData = data as FilterTypes;
    setFilterVar(data);
    const filterParams = generateParams(formattedData);
    if (Object.keys(filterParams).length > 0) getTrackingMutate(filterParams);
    else getTrackingMutate(undefined);
  };

  const handleResetFilter = () => {
    getTrackingMutate(undefined);
    setFilterVar(undefined);
  };

  const handleExport = async () => {
    setExportLoading(true);
    const download = (data: any) => {
      const a = document.createElement('a');
      a.href = data.link;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
      message.success('Tải về thành công!');
    };

    try {
      if (filterRawDataStore) {
        const res = await exportsTrackingService(filterRawDataStore);
        download(res);
      } else {
        const res = await exportsTrackingService();
        download(res);
      }
    } catch {
      message.error('Đã có lỗi xảy ra! Vui lòng thử lại!');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <>
      <Provider columnRaw={{
        sku: skuColumnRaw,
        gift: giftColumnRaw
      }}
      >
        {({ columns }) => (
          <div className="p-rawData">
            <PageTable
              isLoading={isLoading}
              exportLoading={exportLoading}
              tableProps={{
                editMenuConfig: {
                  width: 130,
                  fixed: 'right',
                  render: (trackingItem: any) => (
                    <Button
                      type="text"
                      style={{ color: '#285ffa' }}
                      icon={<FileImageOutlined />}
                      onClick={() => {
                        setOpenPopup((prev) => ({
                          ...prev,
                          image: true,
                        }));
                        setCurrentOutlet(trackingItem?.code);
                        setOutletInfo(trackingItem);
                      }}
                    >
                      Xem hình
                    </Button>
                  ),
                },
                data: rawDataFormatted,
                currentPage,
                columns,
                pageSize: currentView,
                handleSetCurrentPage,
                handleSetCurrentView,
              }}
              filterFields={filter}
              submitFilter={onFiltering}
              onResetFilter={handleResetFilter}
              onExport={handleExport}
            />
          </div>
        )}
      </Provider>
      <Modal
        title={(
          <>
            <Typography.Title level={3}>{outletInfo?.outletName}</Typography.Title>
            <Typography.Text>
              {outletInfo?.date}
              {' '}
              -
              {' '}
              {outletInfo?.workingTime}
            </Typography.Text>
          </>
        )}
        visible={openPopup.image}
        onCancel={() => setOpenPopup((prev) => ({
          ...prev,
          image: false,
        }))}
        footer={null}
        width={864}
      >
        <OCFinderContainer
          id={currentOutlet}
        />
      </Modal>
    </>
  );
};

export default RawData;
