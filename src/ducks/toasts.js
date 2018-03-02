import warning from 'warning';

import { SHOW_TOAST, HIDE_TOAST } from 'ducks/actionTypes';




const defaultState = [];


function toastsReducer(state=defaultState, action) {
	switch (action.type) {
		case SHOW_TOAST:
			return [...state, action.payload];

		case HIDE_TOAST:
			// Optional payload may contain a toast name. If truthy, remove all toasts with that name.
			// If payload is falsey, just remove the first toast (the currently visible one).
			if (action.payload) {
				return state.filter(toast => toast.name !== action.payload)
			} else {
				return state.filter((toast, i) => i !== 0);
			}

		default:
			return state;
	}
}

export default toastsReducer;





// `toast` is required
const showToastAC = toast => ({ type: SHOW_TOAST, payload: toast });
// `name` is optional. If omitted, will hide the currently visible toast.
const hideToastAC = toastName => ({ type: HIDE_TOAST, payload: toastName });


// Export default toast duration for tests.
export const defaultDuration = 5000;
let currentTimerId;

export const showToast = (toast) => {
	return function showToastThunk(dispatch, getState) {
		// We don't want any toasts (like service worker install) getting baked into pre-rendered html.

		if (process.env.NODE_ENV !== 'production') {
			warning(
				typeof toast.message === 'string',
				'showToast() must be given a toast with a `message` property [string]'
			);
			warning(
				!toast.name || typeof toast.name === 'string',
				'Optional `name` property given to showToast() must be a string'
			);
			warning(
				!toast.duration || typeof toast.duration === 'number',
				'Optional `duration` property given to showToast() must be a number'
			);
			warning(
				!toast.refresh || toast.refresh === true,
				'Optional `refresh` property given to showToast() must be a boolean'
			);
		}

		dispatch(showToastAC(toast));

		// If we just added the first toast in the queue, start a timer.
		const state = getState();
		const toasts = toastsSelector(state);
		if (toasts.length === 1) {
			const duration = toast.duration || defaultDuration;
			currentTimerId = setTimeout(() => {
				dispatch(hideToast())
			}, duration);
		}
	};
};


export const hideToast = (toastName) => {
	return function hideToastThunk(dispatch, getState) {
		if (process.env.NODE_ENV !== 'production') {
			warning(
				!toastName || typeof toastName === 'string',
				'Optional `toastName` argument given to hideToast() must be a string'
			);
		}

		const state = getState();
		const activeToast = activeToastSelector(state);

		// If there is no active toast, then there are no toasts, and therefore nothing to hide.
		if (!activeToast) {
			return;
		}

		const removedActiveToast = !toastName || activeToast.name === toastName;
		dispatch(hideToastAC(toastName));

		// If removing the active toast, clear the current timeout.
		if (removedActiveToast) {
			clearTimeout(currentTimerId);
		}

		// If removing the active toast and there are remaining toasts, start another timer
		const afterState = getState();
		const nextToast = activeToastSelector(afterState);
		if (removedActiveToast && nextToast) {
			const duration = nextToast.duration || defaultDuration;
			currentTimerId = setTimeout(() => {
				dispatch(hideToast())
			}, duration);
		}
	};
};




// Returns root toasts state
export const toastsSelector = state => state.toasts;
// Returns the currently active toast type, or undefined if there are no toasts.
export const activeToastSelector = state => state.toasts[0];
