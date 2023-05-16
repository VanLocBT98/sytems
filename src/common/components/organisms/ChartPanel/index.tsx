import {
  Card, Select, Space, Typography
} from 'antd';
import React, { useContext } from 'react';

import { LayoutContext } from 'common/components/templates/MainLayout/context';
import useWindowDimensions from 'common/hooks/useWindowDimension';

interface ChartPanelProps {
  children?: React.ReactNode;
  label: string;
  agencyOptions?: OptionsType[];
  timeOptions?: OptionsType[];
  notCard?: boolean;
  agencyOnChange?: (v: string) => void;
  timeOnChange?: (v: string) => void;
}

export interface ChartSelectionProps {
  label?: string;
  options: OptionsType[];
  defaultValue?: OptionsType;
  placeholder?: string;
  onChange?: (v: string) => void;
}

const { Option } = Select;

const ChartSelection: React.FC<ChartSelectionProps> = ({
  label, options, defaultValue, placeholder, onChange
}) => (
  <Space>
    <Typography.Text style={{ color: '#586063' }}>
      {label}
      :
    </Typography.Text>
    <Select
      defaultValue={defaultValue?.label}
      placeholder={placeholder || label}
      style={{ width: '100%', maxWidth: 100 }}
      bordered={false}
      onChange={(v) => onChange && onChange(v)}
    >
      {
        options.map((k, idx) => (
          <Option key={`item-${idx.toString()}`} value={k.value}>{k.label}</Option>
        ))
      }
    </Select>
  </Space>
);

const ChartPanel: React.FC<ChartPanelProps> = ({
  children, label, agencyOptions, timeOptions, notCard, agencyOnChange, timeOnChange
}) => {
  const { collapsed } = useContext(LayoutContext);
  const { width: winWidth } = useWindowDimensions();

  const renderContent = () => (
    <Space
      style={{ width: '100%', flexDirection: 'column', alignItems: 'unset' }}
      size={notCard ? 16 : 24}
    >
      <Space
        direction={collapsed || (winWidth && winWidth >= 1300) ? 'horizontal' : 'vertical'}
        className="o-chartPanel_header"
        style={{ width: '100%', justifyContent: 'space-between' }}
        size={collapsed ? 12 : 4}
      >
        <Typography.Text
          strong
          style={{
            fontSize: 16,
            lineHeight: '22px'
          }}
        >
          {label}
        </Typography.Text>
        <Space className="o-chartPanel_filter" style={{ width: '100%' }}>
          {
            agencyOptions && agencyOptions.length > 0
            && (
              <ChartSelection
                label="Agency"
                options={agencyOptions}
                defaultValue={agencyOptions[0]}
                onChange={agencyOnChange}
              />
            )
          }
          {
            timeOptions && timeOptions.length > 0
            && (
              <ChartSelection
                label="Thời gian"
                options={timeOptions}
                placeholder="Năm"
                onChange={timeOnChange}
              />
            )
          }
        </Space>
      </Space>
      {children}
    </Space>
  );

  return (
    <div className="o-chartPanel">
      {
        notCard ? renderContent()
          : (
            <Card>
              {renderContent()}
            </Card>
          )
      }
    </div>
  );
};

ChartPanel.defaultProps = {
  children: undefined,
};

export default ChartPanel;
