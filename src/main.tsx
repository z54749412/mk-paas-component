import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';

import { QueryClient, QueryClientProvider } from 'react-query';

import './main.scss';

import App from '~/src/containers/App';

import catchUnhandledRejection from './errorHandler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

catchUnhandledRejection();

const render = (Component: React.ComponentType) => {
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

render(App);
