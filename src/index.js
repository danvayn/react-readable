import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root'
import storeConfig from './config';


ReactDOM.render(<Root store={storeConfig}/>, document.getElementById('root'));
registerServiceWorker();
