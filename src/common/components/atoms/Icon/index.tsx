import React from 'react';

import mapModifiers from 'common/utils/functions';

export const iconList = {
  delete: 'delete',
  alert: 'alert',
  caret: 'caret',
  caretGreen: 'caretGreen',
  caretRed: 'caretRed',
  personCircle: 'personCircle',
  lock: 'lock',
  signOut: 'signOut',
  edit: 'edit',
  editBlack: 'editBlack',
  lockWhite: 'lockWhite',
  checkmark: 'checkmark',
  dismiss: 'dismiss',
  add: 'add',
  filter: 'filter',
  more: 'more',
  eye: 'eye',
  trash: 'trash',
  editYellow: 'editYellow',
  image: 'image',
};

export type IconName = keyof typeof iconList;

export type IconSize = '12x12'
  | '14x14'
  | '16x16'
  | '18x18'
  | '20x20'
  | '18x18'
  | '26x26'
  | '24x24'
  | '28x28'
  | '32x32';
type Props = {
  iconName: IconName;
  size?: IconSize;
};

const Icon: React.FC<Props> = ({ iconName, size }) => (
  <i className={mapModifiers('a-icon', iconName, size)} />
);

Icon.defaultProps = {
  size: '24x24',
};

export default Icon;
