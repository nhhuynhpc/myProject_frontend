import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { store } from './redux/stores';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

let persitor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <PersistGate loading={null} persistor={persitor}>
            <App />
        </PersistGate>
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
