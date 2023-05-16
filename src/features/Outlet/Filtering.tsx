import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Button, DatePicker, Select, Space
} from 'antd';
import Typography from 'antd/lib/typography';
import React from 'react';

import { DATE_FORMAT } from 'common/utils/constants';
import { formatDateYYYYMMDD } from 'common/utils/functions';

const { Option } = Select;
const { RangePicker } = DatePicker;
const Filtering: React.FC = () => {
  const regionOptions = [...Array(3)].map((_, i) => ({
    value: i + 1,
    label: `region ${i + 1}`
  }));

  return (
    <div className="p-outlet_filter">
      <Space style={{ width: '100%' }} size={12}>
        <Typography.Text
          style={{
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 500,
            color: '#2C3032'
          }}
        >
          View by:
        </Typography.Text>
        <Space style={{ width: '100%' }} size={18}>
          <Select
            // value={field.value}
            // onChange={field.onChange}
            placeholder="Region"
            style={{ minWidth: 148 }}
          >
            {regionOptions
              && regionOptions.map((val, i) => (
                <Option
                  value={val.value}
                  key={`item-${i.toString()}`}
                >
                  {val.label}
                </Option>
              ))}
          </Select>
          <Select
            // value={field.value}
            // onChange={field.onChange}
            placeholder="Region"
            style={{ minWidth: 148 }}
          >
            {regionOptions
              && regionOptions.map((val, i) => (
                <Option
                  value={val.value}
                  key={`item-${i.toString()}`}
                >
                  {val.label}
                </Option>
              ))}
          </Select>
          <RangePicker
            format={DATE_FORMAT}
            onChange={(val) => {
              if (!val) return;
              const res = val.map((item) => (formatDateYYYYMMDD(item)));
              console.log(res);
            }}
          />
          <Button
            className="crayola"
            type="default"
            icon={<CheckOutlined />}
          >
            Xác nhận
          </Button>
          <Button
            type="default"
            className="antiFlashWhite"
            icon={<CloseOutlined />}
          >
            Làm mới bộ lọc
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default Filtering;
