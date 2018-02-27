import warning from 'warning';

import ToastType from 'enums/ToastType';
import { PUSH_TOAST, POP_TOAST } from 'ducks/actionTypes';




const defaultState = [];


function toastsReducer(state=defaultState, action) {
	switch (action.type) {
		case PUSH_TOAST:
			return [...state, action.payload];

		case POP_TOAST:
			return state.filter((toast, i) => i !== 0);

		default:
			return state;
	}
}

export default toastsReducer;





const pushToastAC = toastType => ({ type: PUSH_TOAST, payload: toastType });
const popToastAC = () => ({ type: POP_TOAST });

export const pushToast = (toastType, duration=5000) => {
	return function pushToastThunk(dispatch, getState, api) {
		// We don't want any toasts (like service worker install) getting baked into pre-rendered html.

		if (process.env.NODE_ENV !== 'production') {
			warning(
				ToastType.isValid(toastType),
				'Invalid toast type provided to pushToast(). See "enums/ToastType" for valid types.'
			);
		}

		dispatch(pushToastAC(toastType));
		// TODO: Support queueing toasts
		setTimeout(() => {
			dispatch(popToastAC())
		}, duration);
	};
};




// Returns the currently active toast type, or undefined if there are no toasts.
export const activeToastSelector = state => state.toasts[0];
