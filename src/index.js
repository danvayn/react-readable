import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App'
import storeConfig from './config';


ReactDOM.render(
  <Provider store={storeConfig}>
    <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
