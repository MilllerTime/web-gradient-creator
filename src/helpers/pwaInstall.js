// Since this app fully qualifies as a "Progressive Web App", supporting browsers will show an install prompt which, once completed,
// allows the app to be used much like a native application. More info here:
// https://developers.google.com/web/fundamentals/app-install-banners/
//
// The default behavior is not ideal for us, though. We don't want to prompt the user to install if they've barely used the app.
// For now, we're just catching the install prompt and preventing it from showing. This doesn't perma-cancel the prompt.
// In the future, instead of simply hiding it, we can show our own install button somewhere. This will appear for old and new users.



// Trap install prompt and delegate to custom behavior.
// ---------------------------------------------------------------------------

// Will be used to store a reference to the captured prompt event.
let deferredPromptEvent;

export function deferInstallPrompt() {
	window.addEventListener('beforeinstallprompt', function(evt) {
		evt.preventDefault();

		// Store event so it can be triggered later.
		deferredPromptEvent = evt;

		// TODO: Update state to show an install button somewhere.

		return false;
	});
}




// Public method for showing prompt
// ---------------------------------------------------------------------------


/**
 * Show the system install prompt if a prompt event has been captured. Note that once this is triggered successfully,
 * it cannot be triggered again, because either:
 *  - The user installed the web app, in which case the system no longer shows the install prompt, or
 *  - The user rejected the prompt, in which case the system won't show it again.
 *
 * This function should only be called in direct response to a user tapping a custom "install" button.
 *
 * @return {undefined}
 */
export function showSystemInstallPrompt() {
	if (!deferredPromptEvent) return;

	// TODO: Update state to hide the custom install button

	// Retrigger stored system prompt
	deferredPromptEvent.prompt();

	// evt.userChoice will return a Promise. Use it to track what user does with the system prompt.
	deferredPromptEvent.userChoice.then(choiceResult => {
		if(choiceResult.outcome === 'dismissed') {
			// User rejected install
		}
		else {
			// User installed app
		}
	});
}
