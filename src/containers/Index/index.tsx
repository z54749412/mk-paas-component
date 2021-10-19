import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'antd';
import request from '@/utils/request';

const { confirm } = Modal;
export default function Index() {
  const history = useHistory();
  useEffect(() => {
    request.get('/index-infos').then(() => {});
  }, []);
  return (
    <div>
      <Button title="测试一下" type="primary">
        Index
      </Button>
      <Button
        title="测试一下"
        type="primary"
        onClick={() => {
          history.push('/about');
        }}>
        About
      </Button>
      <Button
        type="primary"
        onClick={() => {
          Modal.confirm({
            title: 'Confirm',
            icon: null,
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
          });
        }}>
        Test
      </Button>
    </div>
  );
}
