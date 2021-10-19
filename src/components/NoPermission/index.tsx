import React from 'react';

import emptyIcon from '@assets/images/empty-icon@2x.png';
import './index.scss';

interface PropsType {
  style?: any;
}

const PREFIX_CLS = 'NoPermission';

const NoPermission: React.FC<PropsType> = ({ style }) => {
  return (
    <>
      <div className={`${PREFIX_CLS}__content`} style={style}>
        <img className={`${PREFIX_CLS}__icon`} src={emptyIcon} alt="每刻云平台" />
      </div>
    </>
  );
};
export default NoPermission;
