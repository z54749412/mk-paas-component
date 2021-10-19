import React from 'react';

import './index.scss';

import NoPermission from '@components/NoPermission';

const PREFIX_CLS = 'Error';

interface PropsType {}

const Error: React.FC<PropsType> = () => (
  <div className={`${PREFIX_CLS}__content`}>
    <NoPermission />
  </div>
);

export default Error;
