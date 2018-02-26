import chroma from 'chroma-js';

import Theme from 'enums/Theme';
import ColorSpace from 'enums/ColorSpace';
import createSimpleAction from 'helpers/createSimpleAction';

import {
	SET_BACKGROUND,
	SET_COLOR_SPACE,
	SET_STOP_COUNT,
	ADD_STOP,
	UPDATE_STOP,
	REMOVE_STOP
} from 'ducks/actionTypes';



/////////////
// REDUCER //
/////////////

const defaultState = {
	background: Theme.Dark,
	colorSpace: ColorSpace.LAB,
	stopCount: 8,
	stops: [
		{
			colorSpace: ColorSpace.LAB,
			l: 94,
			a: 0,
			b: 30
		},
		{
			colorSpace: ColorSpace.LAB,
			l: 60,
			a: 8,
			b: -62
		}
	]
};

function activeGradientReducer(state=defaultState, action) {
	switch (action.type) {
		case SET_BACKGROUND:
			return {
				...state,
				background: action.payload
			};

		case SET_COLOR_SPACE:
			return {
				...state,
				colorSpace: action.payload
			};

		case SET_STOP_COUNT:
			return {
				...state,
				stopCount: action.payload
			};

		case UPDATE_STOP:
			return updateStop(state, action)

		default:
			return state;
	}
}

export default activeGradientReducer;


// Helpers

function updateStop(state, action) {
	const { stopIndex, patch } = action.payload;

	return {
		...state,
		stops: state.stops.map((stop, i) => {
			if (i === stopIndex) {
				return { ...stop, ...patch };
			}
			return stop;
		})
	};
}




/////////////
// ACTIONS //
/////////////

const createUpdateStopAC = key => (stopIndex, value) => ({
	type: UPDATE_STOP,
	payload: {
		stopIndex,
		patch: { [key]: value }
	}
});

export const setBackground = createSimpleAction(SET_BACKGROUND);
export const setColorSpace = createSimpleAction(SET_COLOR_SPACE);
export const setStopCount = createSimpleAction(SET_STOP_COUNT);

export const setStopColorSpace = createUpdateStopAC('colorSpace');
export const setStopL = createUpdateStopAC('l');
export const setStopA = createUpdateStopAC('a');
export const setStopB = createUpdateStopAC('b');




///////////////
// SELECTORS //
///////////////

const rootSelector = state => state.activeGradient;

export const backgroundSelector = state => rootSelector(state).background;
export const colorSpaceSelector = state => rootSelector(state).colorSpace;
export const stopCountSelector = state => rootSelector(state).stopCount;
export const stopsSelector = state => rootSelector(state).stops;
export const stopSelector = (state, stopIndex) => stopsSelector(state)[stopIndex];

export const stopColorCSSSelector = (state, stopIndex) => {
	const stop = stopSelector(state, stopIndex);
	const color = chroma.lab(stop.l, stop.a, stop.b);
	return color.css();
};
