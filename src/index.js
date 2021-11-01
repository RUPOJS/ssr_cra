import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Loadable from 'react-loadable';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
// import reportWebVitals from './reportWebVitals';

const store = configureStore( window.REDUX_STATE || {});

const AppBundle = (
  <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </ReduxProvider>
);
window.onload = () => {
  Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(
          AppBundle,
          document.getElementById('root')
      );
  });
};
