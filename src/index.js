import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lora', 'Source Sans Pro']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
