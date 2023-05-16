import {
  Col, Row, Space, Typography
} from 'antd';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from 'app/store';
import { Provinces } from 'common/services/trackings/types';
import { formatDateDDMMYYYY } from 'common/utils/functions';

interface ContentOverviewProps {
  children?: React.ReactNode;
  title?: string;
  date?: string[];
  location?: Provinces[];
  isGrid?: boolean;
  sideFilter?: React.ReactNode;
}

const ContentOverview: React.FC<ContentOverviewProps> = ({
  children,
  title,
  date,
  location,
  isGrid,
  sideFilter,
}) => {
  const { projectInfo } = useAppSelector((state) => state.tracking);
  const [showDate, setShowDate] = useState<string[]>();

  // Init default Date if no date selected
  useEffect(() => {
    if (!projectInfo) return;
    setShowDate([projectInfo?.start, projectInfo?.end]);
  }, [projectInfo]);

  return (
    <div className="t-contentOverview">
      <Row gutter={[16, 16]}>
        <Col span={24} xl={8}>
          <Space style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography.Title
              level={2}
              style={{
                fontWeight: 700,
                color: '#007125',
              }}
            >
              {title}
            </Typography.Title>
            <Space
              style={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {(showDate || (date && Array.isArray(date)))
                && (
                  <Typography.Text
                    style={{
                      display: 'block',
                      fontWeight: 500,
                      color: '#586063',
                    }}
                  >
                    {(showDate && !date)
                      && `Start from ${formatDateDDMMYYYY(showDate[0], false, true)
                      } `}
                    {date
                      && `Start from ${formatDateDDMMYYYY(date[0], false, true)
                      }  `}
                  </Typography.Text>
                )}
              {location && (
                <Typography.Text
                  style={{
                    display: 'block',
                    fontWeight: 500,
                    color: '#586063',
                  }}
                >
                  {`In ${location.map((item) => (` ${item.name}`))}`}
                </Typography.Text>
              )}
            </Space>
          </Space>
        </Col>
        <Col span={24} xl={16}>
          {sideFilter && (
            <Row justify="end">
              {sideFilter}
            </Row>
          )}
        </Col>
      </Row>
      <div className="t-contentOverview_content">
        {!isGrid ? children : (
          <Row gutter={[8, 8]}>
            {React.Children.map(
              children,
              (child: React.ReactNode, idx) => (
                <Col
                  key={`item-${idx.toString()}`}
                  span={24}
                  xl={idx === 0 ? 24 : 12}
                >
                  <div className="t-contentOverview_item">
                    {child}
                  </div>
                </Col>
              ),
            )}
          </Row>
        )}
      </div>
    </div>
  );
};

ContentOverview.defaultProps = {
  children: undefined,
};

export default ContentOverview;
