import React from 'react';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import createHashHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';

import routes from './routes';
import './styles/app.scss';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const history = createHashHistory();
const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history} children={routes} />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

module.hot.accept();
