import store from 'store';
import { showToast } from 'ducks/toasts';


// Slightly modified version of answer here:
// http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

// Copy action will show a toast automatically. By default, it will show a few characters from the copied text itself.
// This can be overridden by passing in custom `displayText`.
export default function copyText(text, displayText) {
	const textArea = document.createElement("textarea");

	//
	// *** This styling is an extra step which is likely not required. ***
	//
	// Why is it here? To ensure:
	// 1. the element is able to have focus and selection.
	// 2. if element was to flash render it has minimal visual impact.
	// 3. less flakyness with selection and copying which **might** occur if
	//    the textarea element is not visible.
	//
	// The likelihood is the element won't even render, not even a flash,
	// so some of these are just precautions. However in IE the element
	// is visible whilst the popup box asking the user for permission for
	// the web page to copy to the clipboard.
	//

	// Place in top-left corner of screen regardless of scroll position.
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;

	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textArea.style.width = '2em';
	textArea.style.height = '2em';

	// We don't need padding, reducing the size if it does flash render.
	textArea.style.padding = 0;

	// Clean up any borders.
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';

	// Avoid flash of white box if rendered for any reason.
	textArea.style.background = 'transparent';


	textArea.value = text;

	document.body.appendChild(textArea);

	textArea.select();

	let copy_successful;
	try {
		copy_successful = document.execCommand('copy');
		const maxChars = 32;
		const toastSuffix = typeof displayText !== 'string'
			? `"${text.length <= maxChars ? text : `${text.substr(0, maxChars)}...`}"`
			: displayText
		store.dispatch(showToast({
			message: `Copied ${toastSuffix}`,
			name: 'copyNotification',
			duration: 2600
		}));
	} catch (err) {
		copy_successful = false;
	}

	document.body.removeChild(textArea);

	if (!copy_successful) {
		console.log('Could not copy to clipboard, data is displayed below:');
		console.log(text);

		// fallback
		const ctrl_key = (navigator.platform.indexOf('Mac') === -1) ? 'Ctrl' : 'Cmd';
		window.prompt('Copy to clipboard: ' + ctrl_key + '+C, Enter. Some browsers may truncate long strings!', text);
	}

	return copy_successful;
}
