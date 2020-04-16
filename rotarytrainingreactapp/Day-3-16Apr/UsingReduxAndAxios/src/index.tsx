import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './product.style.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {WrapperApp} from './components/connect';
var mainApp = <Provider store={store}>
  <WrapperApp/>
</Provider>
ReactDOM.render(
  mainApp,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
