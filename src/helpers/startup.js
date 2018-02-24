// A place for code that just needs to run when the app starts up. Should be executed immediately, before any components
// mount or render. Full of side effects!
//
import { deferInstallPrompt } from 'helpers/pwaInstall';



function startup() {
	deferInstallPrompt();
}

export default startup;
