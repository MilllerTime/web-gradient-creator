import { SET_ACTIVE_STOP } from 'ducks/actionTypes';



/////////////
// REDUCER //
/////////////

const defaultState = {
	activeStop: null
};

function uiReducer(state=defaultState, action) {
	switch (action.type) {
		case SET_ACTIVE_STOP:
			return {
				...state,
				activeStop: action.payload
			};

		default:
			return state;
	}
}

export default uiReducer;




/////////////
// ACTIONS //
/////////////

export function setActiveStop(stopId) {
	return {
		type: SET_ACTIVE_STOP,
		payload: stopId
	};
}




///////////////
// SELECTORS //
///////////////

export const activeStopSelector = state => state.ui.activeStop;
