import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import './i18n';
import dialogPolyfill from 'dialog-polyfill';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

if (!('HTMLDialogElement' in window)) {
  dialogPolyfill.registerDialog(document.querySelector('dialog'));
}
