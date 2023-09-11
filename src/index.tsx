import { createStandaloneToast } from '@chakra-ui/toast';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from 'routes';

import store from 'store';

import './index.scss';

const { ToastContainer } = createStandaloneToast();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router />
    <ToastContainer />
  </Provider>
);
