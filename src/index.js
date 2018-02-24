import React from 'react';
import ReactDOM from 'react-dom';

import App from 'ui/App';
import registerServiceWorker from 'registerServiceWorker';
import startup from 'helpers/startup';

import 'css/reset.css';
import 'css/index.css';



startup();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
