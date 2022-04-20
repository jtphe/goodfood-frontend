import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './fonts/Source_Code_Pro/SourceCodePro-VariableFont_wght.ttf';
import './index.css';
import App from './App';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    {/* Suspense API prevent the app form rendering before the translation is loaded */}
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
