import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import App from './App';
import './fonts/Source_Code_Pro/SourceCodePro-VariableFont_wght.ttf';
import './index.css';
import './i18n';

export const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    {/* Suspense API prevent the app form rendering before the translation is loaded */}
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <App />
       </PersistGate>
      </Provider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
