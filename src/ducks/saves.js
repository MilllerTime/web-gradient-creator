import { activeGradientSelector } from 'ducks/activeGradient';

import {
	SAVE_GRADIENT,
	LOAD_GRADIENT,
	DELETE_GRADIENT
} from 'ducks/actionTypes';



// Persistent read/write helpers

const saveKey = 'savedGradients';

function loadAllSaves() {
	const saves = localStorage.getItem(saveKey);
	if (saves) {
		return JSON.parse(saves);
	} else {
		return [];
	}
}

function saveAll(saves) {
	localStorage.setItem(saveKey, JSON.stringify(saves));
}




/////////////
// Reducer //
/////////////

function savesReducer(state, action) {
	switch (action.type) {
		case SAVE_GRADIENT:
			return [ ...state, action.payload ];

		case DELETE_GRADIENT:
			return state.filter((save, i) => i !== action.payload);

		default:
			return loadAllSaves();
	}
}

export default savesReducer;





/////////////
// Actions //
/////////////

// Add active gradient to saves and persist all current saves.
export const saveActiveGradient = () => {
	return function saveGradientThunk(dispatch, getState) {
		const state = getState();
		const activeGradient = activeGradientSelector(state);

		dispatch({
			type: SAVE_GRADIENT,
			payload: activeGradient
		});

		const newState = getState();
		saveAll(savesSelector(newState));
	};
};

// Delete gradient at specified index and persist.
export const deleteGradient = (saveIndex) => {
	return function deleteGradientThunk(dispatch, getState) {
		dispatch({
			type: DELETE_GRADIENT,
			payload: saveIndex
		});

		const newState = getState();
		saveAll(savesSelector(newState));
	};
};

// Load a saved gradient as active
export const loadGradient = (saveIndex) => {
	return function loadGradientThunk(dispatch, getState) {
		const state = getState();
		const saves = savesSelector(state);

		dispatch({
			type: LOAD_GRADIENT,
			payload: saves[saveIndex]
		});
	};
};





///////////////
// Selectors //
///////////////

export const savesSelector = state => state.saves;
