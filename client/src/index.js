import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from './Context';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
