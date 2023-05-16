import { DatePicker, Space } from 'antd';
import React, { useContext, useEffect } from 'react';

import GeneralChart from './GeneralChart';
import Statistical from './Statistical';
import statisticalList from './dummy';

import { LayoutContext } from 'common/components/templates/MainLayout/context';
import { formatDateYYYYMMDD } from 'common/utils/functions';

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
const Dashboard: React.FC = () => {
  const { setTitle } = useContext(LayoutContext);

  /**
   * Set Layout Title
   */
  useEffect(() => {
    if (setTitle) setTitle('Dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-home">
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <RangePicker
          format={dateFormat}
          onChange={(val) => {
            if (!val) return;
            const res = val.map((item) => (formatDateYYYYMMDD(item)));
            console.log(res);
          }}
        />
        <Statistical data={statisticalList} />
        <GeneralChart />
      </Space>
    </div>
  );
};

export default Dashboard;
