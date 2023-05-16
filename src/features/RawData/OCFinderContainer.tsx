/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashOutlined, DownloadOutlined, FolderTwoTone } from '@ant-design/icons';
import {
  Breadcrumb, Button, Col, Image, Menu, message, Row, Space, Spin, Typography
} from 'antd';
import React, {
  useCallback,
  useEffect, useMemo,
  useState
} from 'react';
import { useMutation, useQuery } from 'react-query';

import { downloadImageByTrackingService, getListFolderService } from 'common/services/trackings';
import { FolderImageTypes, GetListFolderDataTypes } from 'common/services/trackings/types';

type FolderMenuTypes = {
  key: string;
  label: string;
  type?: string;
  icon: any;
  children: FolderMenuTypes[];
};
type KeyValueFolderTypes = {
  code: string;
  value: string;
  type?: string;
};

export type OutletInfoPopupTypes = {
  id?: number;
  name?: string;
  date?: string;
  time?: string;
};

interface OCFinderContainerInterface {
  id?: number;
}

export function getItem(
  label: string,
  key: string,
  icon?: React.ReactNode,
  children?: any,
  type?: string
) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}
const OCFinderContainer: React.FC<OCFinderContainerInterface> = ({ id }) => {
  const [currentFolderName, setCurrentFolderName] = useState<string>();
  const [menuType, setMenuType] = useState<string>();
  const [posmMenu, setPosmMenu] = useState<FolderMenuTypes>();
  const [activeBreadcrumb, setActiveBreadcrumb] = useState<string[]>([]);
  const [keyValueFolder, setKeyValueFolder] = useState<KeyValueFolderTypes[]>();
  const [imageListRender, setImageListRender] = useState<FolderImageTypes[]>();
  const [activeClickFolder, setActiveClickFolder] = useState(false);

  useEffect(() => {
    setActiveBreadcrumb([]);
    setCurrentFolderName(undefined);
    setImageListRender([]);
    setActiveClickFolder(false);
  }, [id]);

  // Service
  const { data: listFolderData, isLoading } = useQuery(
    ['getListFolder', id],
    () => getListFolderService(id),
    {
      enabled: id !== undefined,
      onSuccess(data) {
        const res: KeyValueFolderTypes[][] = Object.values(data).map((v, i) => v.map((item) => ({
          code: item.code,
          value: item.name,
          type: Object.keys(data)[i]
        })));
        const result = res.reduce((p: KeyValueFolderTypes[], c) => [...p, ...c], [])
          .reduce((p: KeyValueFolderTypes[], c) => (p.some((x) => x.code === c.code)
            ? p
            : [...p, c]), []);
        setKeyValueFolder([...result, {
          code: 'posms',
          value: 'POSM'
        }]);
      },
    }
  );
  const { isLoading: downloadLoading, mutate: downloadImageMutate } = useMutation(
    'downloadImageByTracking',
    downloadImageByTrackingService,
    {
      onSuccess(data) {
        const a = document.createElement('a');
        a.href = data.link;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        a.remove();
        message.success('Tải về thành công!');
      },
      onError() {
        message.error('Tải về không thành công! Vui lòng thử lại!');
      },
    }
  );

  // Convert Menu Object
  const listFolderConverter = useCallback(
    (data?: GetListFolderDataTypes, parentId = null) => {
      if (!data) return [];
      const result: any = [];
      let res: any;
      if (Array.isArray(data.images)) {
        data.images.forEach((value: any) => {
          if (parentId === value.parentId) {
            result.push(getItem(
              value.name,
              value.code,
              <FolderTwoTone twoToneColor="#007125" />,
              value?.parentId === null
                ? listFolderConverter(data, value.id)
                : undefined,
            ));
          }
        });
      }
      if (data.posms && data.posms.length > 0) {
        res = getItem(
          'POSM',
          'posms',
          <FolderTwoTone twoToneColor="#007125" />,
          data.posms.map((v) => getItem(
            v.name,
            v.code,
            <FolderTwoTone twoToneColor="#007125" />,
          )),
          'posm'
        );
      }
      setPosmMenu(res);

      return result;
    },
    [],
  );

  /**
   * Convert Menu Data
   * - images folders
   * - posm folders
   */
  const convertData = useMemo(
    () => listFolderConverter(listFolderData),
    [listFolderConverter, listFolderData],
  );
  const menuCombineData = useMemo(
    () => (posmMenu ? [...convertData, posmMenu] : convertData),
    [posmMenu, convertData]
  );

  /**
 * Breadcrumbs handlers
 */
  const reverseBreadcrumb = [...activeBreadcrumb].reverse();

  // Image list Conditional
  useEffect(() => {
    if (!listFolderData) return;
    const imageList = listFolderData?.images?.find(
      (item) => item.code === currentFolderName,
    )?.images;

    const posmImageList = listFolderData?.posms?.find(
      (item) => item.code === currentFolderName,
    )?.images;

    if (menuType === 'posms') setImageListRender(posmImageList);
    else setImageListRender(imageList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolderName, menuType]);

  /**
   * Event Handler
   * Download Images
   */
  const downloadImage = useCallback(() => {
    if (id) downloadImageMutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Spin spinning={isLoading}>
      <div style={{ height: '60vh', overflow: 'hidden' }} className="OCFinder">

        <Row gutter={[0, 17]}>
          <Col span={24}>
            {
              reverseBreadcrumb && reverseBreadcrumb.length > 0
                ? (
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div className="OCFinder_breadcrumb">
                      <Breadcrumb>
                        {/* <Breadcrumb.Item key="origin">Hình dự án</Breadcrumb.Item> */}
                        {reverseBreadcrumb.map((item) => (
                          <Breadcrumb.Item key={`${item}`}>{`${item}`}</Breadcrumb.Item>
                        ))}
                      </Breadcrumb>
                    </div>
                  </Space>
                ) : <DashOutlined />
            }
          </Col>
          <Col span={24}>
            <Row style={{ height: '55vh' }}>
              <Col
                span={7}
                className="OCFinder_menu"
                style={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  maxHeight: '100%',
                }}
              >
                <Menu
                  key={`${id}`}
                  onClick={(e) => {
                    setActiveClickFolder(true);
                    const res = e.keyPath.map(
                      (v) => keyValueFolder?.find((f) => f.code === v)?.value || ''
                    );
                    const type = keyValueFolder?.find((f) => f.code === e.key)?.type || '';
                    if (res) setActiveBreadcrumb(res);
                    setCurrentFolderName(e.key);
                    setMenuType(type);
                  }}
                  mode="inline"
                  items={menuCombineData}
                  style={{ borderRight: 2, borderRightColor: 'red' }}
                />
              </Col>
              <Col
                span={17}
                className="OCFinder_contain"
                style={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  maxHeight: '100%',
                }}
              >
                <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 18 }}>
                  {
                    !activeClickFolder
                    && (
                      <Typography.Title level={3}>
                        Vui lòng chọn thư mục bên trái
                      </Typography.Title>
                    )
                  }
                  {
                    activeClickFolder && imageListRender && imageListRender.length < 1
                    && (
                      <Typography.Title level={3}>
                        Không có hình ảnh
                      </Typography.Title>
                    )
                  }
                  <div />
                  <Button
                    loading={downloadLoading}
                    className="mountainMeadow"
                    onClick={downloadImage}
                    icon={<DownloadOutlined />}
                  >
                    Download
                  </Button>
                </Space>
                <Image.PreviewGroup>
                  <Row gutter={[16, 16]}>
                    {
                      imageListRender && imageListRender.length > 0
                      && imageListRender.map((item, i) => (
                        <Col span={6} lg={4} key={`${i.toString()}`}>
                          <Image
                            src={item.url}
                            width={80}
                            height={80}
                          />
                        </Col>
                      ))
                    }
                  </Row>
                </Image.PreviewGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default OCFinderContainer;
