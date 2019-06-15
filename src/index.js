import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import dialogPolyfill from 'dialog-polyfill';

ReactDOM.render(<App />, document.getElementById('root'));

if (!('HTMLDialogElement' in window)) {
  dialogPolyfill.registerDialog(document.querySelector('dialog'));
}
