import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'ui/App';
import store from 'store';
import registerServiceWorker from 'registerServiceWorker';
import startup from 'helpers/startup';

import 'css/reset.css';
import 'css/index.css';



startup();

ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById('root')
);
registerServiceWorker();
