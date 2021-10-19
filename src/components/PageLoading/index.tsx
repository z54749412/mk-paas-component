import React from 'react';
import { Spin } from 'antd';

import './index.scss';

const PREFIX_CLS = 'PageLoading';

const PageLoading: React.FC = () => {
  return (
    <div className={`${PREFIX_CLS}__content`}>
      <Spin className={`${PREFIX_CLS}__spin`} />
    </div>
  );
};

export default PageLoading;
