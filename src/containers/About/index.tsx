import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

export default function About() {
  console.log(window.BASEURL);
  const history = useHistory();
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          history.goBack();
        }}>
        goBack
      </Button>
      <Button
        type="primary"
        onClick={() => {
          history.push('/');
        }}>
        Index
      </Button>
    </div>
  );
}
