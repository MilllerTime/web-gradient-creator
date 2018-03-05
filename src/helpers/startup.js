// A place for code that just needs to run when the app starts up. Should be executed immediately, before any components
// mount or render. Full of side effects!
//
import throttle from 'lodash.throttle';

import store from 'store';
import { deferInstallPrompt } from 'helpers/pwaInstall';
import { setViewportWidth } from 'ducks/ui';



function startup() {
	deferInstallPrompt();

	function handleResize() {
		store.dispatch(setViewportWidth(window.innerWidth));
	}

	window.addEventListener('resize', throttle(handleResize, 150));
}

export default startup;
